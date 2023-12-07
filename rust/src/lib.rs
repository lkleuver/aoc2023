use std::fs;
use std::io;
use std::path::Path;

pub fn read_day_file(day: u32) -> Result<String, io::Error> {
    let file_path = format!("../input/{}.txt", day);
    let path = Path::new(&file_path);

    fs::read_to_string(path)
}

pub fn get_lines(day: u32) -> Vec<String> {
    match read_day_file(day) {
        Ok(contents) => contents.lines().map(|s| s.to_string()).collect(),
        Err(e) => {
            println!("Error reading file: {}", e);
            vec![]
        }
    }
}
