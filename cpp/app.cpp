#include <iostream>
#include <fstream>
#include <string>
#include <string.h>
#include "json.hpp"
#include "todos.hpp"

using json = nlohmann::json;

int main(int argc, char *argv[])
{
	if (argc < 3)
	{
		std::cerr << "usage: <operation> <cmd>" << std::endl;
		return 1;
	}

	const char *operation = argv[1];
	const char *cmd = argv[2];

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

	if (strcmp(operation, "create") == 0)
	{
		std::cout << "create" << std::endl;
	}
	else if (strcmp(operation, "view") == 0)
	{
		std::cout << "view" << std::endl;
	}
	else if (strcmp(operation, "edit") == 0)
	{
		std::cout << "edit" << std::endl;
	}
	else if (strcmp(operation, "delete") == 0)
	{
		std::cout << "delete" << std::endl;
	}
	else if (strcmp(operation, "finish") == 0)
	{
		std::cout << "finish" << std::endl;
	}
	else if (strcmp(operation, "unfinish") == 0)
	{
		std::cout << "unfinish" << std::endl;
	}
	else
	{
		std::cerr << "Invalid operation. Must be create, view, edit, delete, finish, or unfinish." << std::endl;
	}

	return 0;
}
