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

func validateArgs(args []string, length int) ([]string, error) {
	if len(args) < length {
		return nil, fmt.Errorf("args length must be greater than %d", length)
	}

	return args, nil
}

func viewTodos(todos Todos, arg []string) error {
	args, err := validateArgs(arg, 3)
	if err != nil {
		return err
	}

	key := args[2]
	if key == "all" {
		for key, todo := range todos.TodoList {
			isCompleted := "✓"
			if !todo.IsCompleted {
				isCompleted = " "
			}

			fmt.Printf("%s: [%s] %s\n", key, isCompleted, todo.Todo)
		}
		return nil
	} else if _, err := strconv.Atoi(key); err == nil {
		todo, ok := todos.TodoList[key]
		if !ok {
			return fmt.Errorf("specified key %s does not exist in your todos", key)
		}

		isCompleted := "✓"
		if !todo.IsCompleted {
			isCompleted = " "
		}

		fmt.Printf("%s: [%s] %s\n", key, isCompleted, todo.Todo)
		return nil
	} else {
		return fmt.Errorf("unknown cmd: %s", key)
	}
}

func createTodos(todos *Todos, arg []string) error {
	args, err := validateArgs(arg, 3)
	if err != nil {
		return err
	}
	desc := args[2]
	newTodo := Todo{
		IsCompleted: false,
		Todo:        desc,
	}

	key := strconv.Itoa(int(todos.NextId))
	todos.TodoList[key] = newTodo
	todos.NextId++

	fmt.Println("Created new todo with key: ", key)
	return nil
}

func editTodo(todos *Todos, arg []string) error {
	args, err := validateArgs(arg, 4)
	if err != nil {
		return err
	}

	key := args[2]
	todo, ok := todos.TodoList[key]
	if !ok {
		return fmt.Errorf("Todo with key %s does not exist", key)
	}

	todo.Todo = args[3]
	todos.TodoList[key] = todo

	return nil
}

func deleteTodo(todos *Todos, arg []string) error {
	args, err := validateArgs(arg, 3)
	if err != nil {
		return err
	}

	key := args[2]
	_, ok := todos.TodoList[key]
	if !ok {
		return fmt.Errorf("Todo with key %s does not exist", key)
	}

	delete(todos.TodoList, key)

	return nil
}

func updateTodo(todos *Todos, arg []string, isFinished bool) error {
	args, err := validateArgs(arg, 3)
	if err != nil {
		return err
	}

	key := args[2]
	todo, ok := todos.TodoList[key]
	if !ok {
		return fmt.Errorf("Todo with key %s does not exist", key)
	}

	if isFinished {
		todo.IsCompleted = true
	} else {
		todo.IsCompleted = false
	}
	todos.TodoList[key] = todo

	return nil
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
	_, err := validateArgs(os.Args, 2)
	if err != nil {
		fmt.Println("Error:", err)
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
		err := viewTodos(todos, os.Args)
		if err != nil {
			fmt.Println("Error:", os.Args)
			return
		}
	case "create":
		err := createTodos(&todos, os.Args)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}
	case "edit":
		err := editTodo(&todos, os.Args)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}
	case "delete":
		err := deleteTodo(&todos, os.Args)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}
	case "finish":
		err := updateTodo(&todos, os.Args, true)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}
	case "unfinish":
		err := updateTodo(&todos, os.Args, false)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}
	default:
		fmt.Println("operation does not match create, edit, update, delete, finish, or unfinish.")
	}

	fileErr := writeFile(todos)
	if fileErr != nil {
		fmt.Println("Error writing to a file:", fileErr)
		return
	}
}
