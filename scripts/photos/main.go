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
	"time"

	"github.com/atotto/clipboard"
	"github.com/buckket/go-blurhash"
	"pkg.mattglei.ch/timber"
)

const PHOTOS_FOLDER = "../../public/photos"

var files = []string{
	"RITRacing.jpg",
	"audiA4.jpg",
	"mtb2.jpg",
	"marcAudi.jpg",
	"spider.jpg",
	"eye.jpg",
	"glass.jpg",
	"cadillac.jpg",
	"ladybug.jpg",
	"porsche.jpg",
	"up.jpg",
	"motorcycle.jpg",
	"hayhay.jpg",
	"mtb1.jpg",
	"flowers.jpg",
	"beach.jpg",
	"nyc.jpg",
	"eggBeach.jpg",
}

type photo struct {
	Name        string
	Filename    string
	Path        string
	AspectRatio float32
	BlurDataURL string
}

func main() {
	timber.SetTimezone(time.Local)
	timber.SetTimeFormat("03:04:05")

	photos := []photo{}
	for _, file := range files {
		reader, err := os.Open(filepath.Join(PHOTOS_FOLDER, file))
		if err != nil {
			timber.Fatal(err, "failed to read image:", file)
		}
		defer reader.Close()

		parsedJPG, err := jpeg.Decode(reader)
		if err != nil {
			timber.Fatal(err, "parsing JPEG failed for", file)
		}
		width := parsedJPG.Bounds().Dx()
		height := parsedJPG.Bounds().Dy()
		blurData, err := blurhash.Encode(4, 3, parsedJPG)
		if err != nil {
			timber.Fatal(err, "creating blur data for", file, "failed")
		}

		scaleDownFactor := 200
		blurImage, err := blurhash.Decode(
			blurData,
			width/scaleDownFactor,
			height/scaleDownFactor,
			1,
		)
		if err != nil {
			timber.Fatal(err, "Encoding blurhash data to img failed for", file)
		}
		blurImageOut := new(bytes.Buffer)
		err = png.Encode(blurImageOut, blurImage)
		if err != nil {
			timber.Fatal(err, "Writing data to PNG failed", file)
		}
		base64BlurData := base64.StdEncoding.EncodeToString(blurImageOut.Bytes())

		photos = append(
			photos, photo{
				Filename: file,
				Name:     strings.TrimSuffix(file, ".jpg"),
				AspectRatio: float32(
					parsedJPG.Bounds().Dx(),
				) / float32(
					parsedJPG.Bounds().Dy(),
				),
				Path:        fmt.Sprintf("/photos/%s", file),
				BlurDataURL: base64BlurData,
			},
		)
		timber.Done("processed", file)
	}

	code := "const images: GalleryImage[] = ["
	for _, photo := range photos {
		code = fmt.Sprintf(
			"%s{src: '/photos/%s', alt: '%s', aspect_ratio: %f, nextImageProps: {placeholder: 'blur', blurDataURL: 'data:image/png;base64,%s', draggable: false}},",
			code,
			photo.Filename,
			photo.Name,
			photo.AspectRatio,
			photo.BlurDataURL,
		)
	}
	code = fmt.Sprintf("%s];", strings.TrimRight(code, ","))
	err := clipboard.WriteAll(code)
	if err != nil {
		timber.Fatal(err, "failed to write code to clipboard")
	}
	timber.Done("code copied to clipboard")
}
