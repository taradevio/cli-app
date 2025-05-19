#!/usr/bin/env node
import { createServer } from "node:http";
import { styleText } from "node:util";
import readline from "node:readline";
import { stdin } from "node:process";
import { argv } from "node:process";
import { JSONFilePreset } from "lowdb/node";
const db = await JSONFilePreset("db.json", { todoLists: [] });

const taskId = db.data.todoLists.at(-1);
const newId = taskId ? taskId.id + 1 : 1;

let storeTodo = {
  id: newId,
  title: argv[3],
};

// console.log(argv)

// const hostname = '127.0.0.1';
// const PORT = 3000;

// const server = createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('hello world')
// })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const addTodo = async () => {
  try {
    if (argv[2] === "add") {
      await db.update(({ todoLists }) => todoLists.push(storeTodo));
      const styleTodo = styleText(["yellow", "bold"], storeTodo.title);
      const styleID = styleText(["blue", "bold"], storeTodo.id.toString());
      console.log(`task ${styleTodo} is added successfully! (ID: ${styleID})`);
      rl.close();
    } else {
      console.log(
        styleText(["red", "bold"], "your command is unavailable atm")
      );
      rl.close();
    }
  } catch (error) {
    console.error(error);
  }
};

addTodo();

// rl.question(`what's your name? `, (name) => {
//     const style1 = styleText(['red', 'bold'], name)
//     console.log(`Hello ${style1}!`);
//   rl.question(`What's your plan today? `, (task) => {
//     const style2 = styleText(['yellow', 'bold'], task);
//     console.log(`Added ${style2}`);
//     rl.close();
//   });
// });

// server.listen(PORT, hostname, () => {
//     console.log(`server is open  at ${hostname}:${PORT}`)
// })

// console.log(
//     styleText(['yellow', 'italic'], 'This is a yellow italicized text ') +
//       styleText(['green', 'bold'], 'and this is green bold text ') +
//       'this is normal text'
//   );
