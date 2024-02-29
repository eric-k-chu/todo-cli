use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    dbg!(&args);

    if args.len() < 4 {
        println!("Usage: cargo run . <op> <arg3> ...");
        return;
    }

    let op: &String = &args[2];

    if op == "create" {
        println!("create");
    } else if op == "view" {
        println!("view");
    } else if op == "edit" {
        println!("edit");
    } else if op == "edit" {
        println!("delete");
    } else if op == "edit" {
        println!("edit");
    } else if op == "finish" {
        println!("finish");
    } else if op == "unfinish" {
        println!("unfinish");
    } else {
        println!("Unknown operation: Must be <create> <view> <edit> <delete> <finish> <unfinish>");
        return;
    }
}
