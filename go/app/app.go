package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Todo struct {
	IsCompleted bool	`json:"isCompleted"`
	Todo string				`json:"todo"`
}

type Todos struct {
	NextId int32	`json:"nextId"`
	TodoList map[string]Todo	`json:"todoList"`
}


func main() {
	if len(os.Args) < 2 {
		fmt.Println("args must be greater or equal to 2.")
		return
	}

	fmt.Println("args:", os.Args[1])

	file, err := os.Open("data.json")

	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer file.Close()

	var todos Todos
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&todos)

	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("NextId:", todos.NextId)
	fmt.Println("TodoList:")
	for key, todo := range todos.TodoList {
		fmt.Printf("\tKey: %s, isCompleted: %t, Todo: %s\n", key, todo.IsCompleted, todo.Todo)
	}

}