package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"time"
)

type Food struct {
	Store       string `json:"store"`
	Category    string `json:"category"`
	FullName    string `json:"fullName"`
	ReceiptName string `json:"receiptName"`
}

type InventoryItem struct {
	Name   string  `json:"name"`
	Amount float32 `json:"amount"`
	Unit   string  `json:"unit"`
	Store  string  `json:"store"`
}

type FoodResponse struct {
	Foods  []InventoryItem `json:"foods"`
	Status string          `json:"status"`
}

type LoginResponse struct {
	Token  string `json:"token"`
	Status string `json:"status"`
}

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")

const tokenLength = 255

func Init() {
	rand.Seed(time.Now().UnixNano())
}

func GenerateToken() string {
	token := make([]rune, tokenLength)
	for i := range token {
		token[i] = letters[rand.Intn(len(letters))]
	}
	return string(token)
}

func LoadFoodsFromJson(storeName string) (foods []string) {
	file := "../data/" + storeName + ".json"
	jsonFile, _ := os.Open(file)
	byteValue, _ := ioutil.ReadAll(jsonFile)
	defer jsonFile.Close()
	// var foods []Food

	if err := json.Unmarshal(byteValue, &foods); err != nil {
		fmt.Println("ERROR", err)
	}

	return

	// INSERT (foodName, store) into food VALUES (?, ?)
	// .Exec(foodName, storeName)
}
