#include <iostream>
#include <fstream>
#include <string>
#include "json.hpp"

using json = nlohmann::json;

struct Todo
{
	bool isCompleted;
	std::string todo;
};

struct Todos
{
	int nextId;
	std::map<std::string, Todo> todoList;
};

int main(int argc, char *argv[])
{
	std::ifstream file("data.json");
	if (!file.is_open())
	{
		std::cerr << "Error: Could not open file" << std::endl;
		return 1;
	}

	json j;
	file >> j;

	Todos todos;
	todos.nextId = j["nextId"];
	for (auto &[key, value] : j["todoList"].items())
	{
		Todo todo;
		todo.isCompleted = value["isCompleted"];
		todo.todo = value["todo"];
		todos.todoList[key] = todo;
	}

	std::cout << "NextId: " << todos.nextId << std::endl;
	std::cout << "TodoList:" << std::endl;
	for (auto &[key, todo] : todos.todoList)
	{
		std::cout << "\tKey: " << key << ", IsCompleted: " << todo.isCompleted << ", Todo: " << todo.todo << std::endl;
	}

	return 0;
}
