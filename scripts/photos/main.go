package main

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"image/jpeg"
	_ "image/jpeg"
	"image/png"
	"os"
	"path/filepath"
	"strings"

	"github.com/buckket/go-blurhash"
	"pkg.mattglei.ch/timber"
)

const photos_folder = "../../public/photos"

type photo struct {
	Name        string
	Filename    string
	Path        string
	AspectRatio float32
	BlurDataURL string
}

func main() {
	timber.Info("BOOTED")
	files, err := os.ReadDir(photos_folder)
	if err != nil {
		timber.Fatal(err, "Failed to read photos folder")
	}

	photos := []photo{}
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".jpg") {
			name := file.Name()
			reader, err := os.Open(filepath.Join(photos_folder, name))
			if err != nil {
				timber.Fatal(err, "Failed to read image:", name)
			}
			defer reader.Close()

			parsedJPG, err := jpeg.Decode(reader)
			if err != nil {
				timber.Fatal(err, "Parsing JPEG failed for", name)
			}
			width := parsedJPG.Bounds().Dx()
			height := parsedJPG.Bounds().Dy()
			blurData, err := blurhash.Encode(4, 3, parsedJPG)
			if err != nil {
				timber.Fatal(err, "Creating blur data for", name, "failed")
			}

			scaleDownFactor := 200
			blurImage, err := blurhash.Decode(
				blurData,
				width/scaleDownFactor,
				height/scaleDownFactor,
				1,
			)
			if err != nil {
				timber.Fatal(err, "Encoding blurhash data to img failed for", name)
			}
			blurImageOut := new(bytes.Buffer)
			err = png.Encode(blurImageOut, blurImage)
			if err != nil {
				timber.Fatal(err, "Writing data to PNG failed", name)
			}
			base64BlurData := base64.StdEncoding.EncodeToString(blurImageOut.Bytes())

			photos = append(
				photos, photo{
					Filename: name,
					Name:     strings.TrimSuffix(name, ".jpg"),
					AspectRatio: float32(
						parsedJPG.Bounds().Dx(),
					) / float32(
						parsedJPG.Bounds().Dy(),
					),
					Path:        fmt.Sprintf("/photos/%s", name),
					BlurDataURL: base64BlurData,
				},
			)
			timber.Done("Processed", name)
		}
	}

	fmt.Println()
	timber.Done("DATA ARRAY:\n")
	fmt.Println("const images: GalleryImage[] = [")
	for _, photo := range photos {
		fmt.Println("\t{")
		fmt.Printf("\t\tsrc: '%s',\n", fmt.Sprintf("/photos/%s", photo.Filename))
		fmt.Printf("\t\talt: '%s',\n", photo.Name)
		fmt.Printf("\t\taspect_ratio: %f,\n", photo.AspectRatio)
		fmt.Println("\t\tnextImageProps: {")
		fmt.Println("\t\t\tplaceholder: 'blur',")
		fmt.Printf("\t\t\tblurDataURL: 'data:image/png;base64,%s'\n", photo.BlurDataURL)
		fmt.Println("\t\t\tdraggable: false")
		fmt.Println("\t\t},")
		fmt.Println("\t},")
	}
	fmt.Println("];")
}
