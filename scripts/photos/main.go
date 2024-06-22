package main

import (
	"fmt"
	"image"
	_ "image/jpeg"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/gleich/lumber/v2"
)

const photos_folder = "../../public/photos"

type Photo struct {
	Filename   string
	Name       string
	Width      int
	Height     int
	Horizontal bool
}

func main() {
	lumber.Info("BOOTED")
	files, err := os.ReadDir(photos_folder)
	if err != nil {
		lumber.Fatal(err, "Failed to read photos folder")
	}

	photos := []Photo{}
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".jpg") {
			name := file.Name()
			reader, err := os.Open(filepath.Join(photos_folder, name))
			if err != nil {
				lumber.Fatal(err, "Failed to read image:", name)
			}
			defer reader.Close()

			im, _, err := image.DecodeConfig(reader)
			if err != nil {
				lumber.Fatal(err, "Reading image data from", name, "failed")
			}
			photos = append(photos, Photo{Filename: name, Name: strings.TrimSuffix(name, ".jpg"), Width: im.Width, Height: im.Height, Horizontal: im.Width > im.Height})
		}
	}

	fmt.Println()
	lumber.Success("IMPORTS:\n")
	for _, photo := range photos {
		fmt.Printf("import %s from '@photos/%s'\n", photo.Name, photo.Filename)
	}

	fmt.Println()
	lumber.Success("DATA ARRAY:\n")
	fmt.Println("const photos: Photo[] = [")
	sort.Slice(photos, func(i, j int) bool {
		return photos[i].Horizontal == true && photos[j].Horizontal == false
	})
	for _, photo := range photos {
		fmt.Println("\t{")
		fmt.Printf("\t\tdata: %s,\n", photo.Name)
		fmt.Printf("\t\talt: '%s',\n", photo.Name)
		fmt.Printf("\t\twidth: %d,\n", photo.Width)
		fmt.Printf("\t\theight: %d,\n", photo.Height)
		fmt.Printf("\t\thorizontal: %t,\n", photo.Horizontal)
		fmt.Println("\t},")
	}
	fmt.Println("];")
}
