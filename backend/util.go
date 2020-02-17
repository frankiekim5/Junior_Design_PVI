package main

import (
	"math/rand"
	"time"
)

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