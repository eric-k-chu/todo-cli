#ifndef TODOS_HPP
#define TODOS_HPP

#include <string>
#include <map>

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

#endif
