use serde::{Deserialize, Serialize};
use serde_json::{Result, Value};
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
struct Todo {
    isCompleted: boolean,
    todo: String,
}

#[derive(Serialize, Deserialize)]
struct Todos {
    nextId: u32,
    todoList: HashMap<u32, Todo>,
}

pub fn read_file() -> Result<()> {
    let mut file = File::open("data.json").expect("Failed to open data.json");

    let mut data = String::new();
}
