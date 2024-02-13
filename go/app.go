package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
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
	key := args[2]

	if key == "all" {
		for key, todo := range todos.TodoList {
			isCompleted := "✓"
			if !todo.IsCompleted {
				isCompleted = " "
			}

			fmt.Printf("%s: [%s] %s\n", key, isCompleted, todo.Todo)
		}
	} else if _, err := strconv.Atoi(key); err == nil {
		todo, ok := todos.TodoList[key]
		if !ok {
			fmt.Println("Specified key does not exist in your todos:", key)
			return
		}

		isCompleted := "✓"
		if !todo.IsCompleted {
			isCompleted = " "
		}

		fmt.Printf("%s: [%s] %s\n", key, isCompleted, todo.Todo)
	} else {
		fmt.Println("Unknown cmd:", key)
		return
	}
}

func createTodos(todos *Todos, args []string) {
	desc := args[2]
	newTodo := Todo{
		IsCompleted: false,
		Todo:        desc,
	}

	key := strconv.Itoa(int(todos.NextId))
	todos.TodoList[key] = newTodo
	todos.NextId++

	fmt.Println("Created new todo with key: ", key)
}

func writeFile(todos Todos) error {
	file, err := os.Create("data.json")
	if err != nil {
		return err
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	err = encoder.Encode(todos)
	if err != nil {
		return err
	}

	return nil
}

func main() {
	if len(os.Args) < 3 {
		fmt.Println("args must be greater than or equal to 3.")
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
		createTodos(&todos, os.Args)
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

	fileErr := writeFile(todos)
	if fileErr != nil {
		fmt.Println("Error writing to a file:", fileErr)
		return
	}
	fmt.Println("Exiting...")
}
