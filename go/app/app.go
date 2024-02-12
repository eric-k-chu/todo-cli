package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Todo struct {
	IsCompleted bool   `json:"isCompleted"`
	Todo        string `json:"todo"`
}

type Todos struct {
	NextId   int32           `json:"nextId"`
	TodoList map[string]Todo `json:"todoList"`
}

func viewTodos(todos Todos, args []string) {
	for key, todo := range todos.TodoList {
		fmt.Printf("Key: %s, isCompleted: %t, Todo: %s\n", key, todo.IsCompleted, todo.Todo)
	}
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("args must be greater or equal to 2.")
		return
	}

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

	op := os.Args[1]

	switch op {
	case "view":
		viewTodos(todos, os.Args)
	case "create":
		fmt.Println("Created.")
	case "edit":
		fmt.Println("Edited.")
	case "update":
		fmt.Println("Updated.")
	case "delete":
		fmt.Println("Deleted.")
	case "finish":
		fmt.Println("Finished.")
	case "unfinish":
		fmt.Println("Unfinished.")
	default:
		fmt.Println("operation does not match create, edit, update, delete, finish, or unfinish.")
	}
}
