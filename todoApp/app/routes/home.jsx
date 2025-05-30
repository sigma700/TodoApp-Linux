import { Welcome } from "../welcome/welcome";
import Input from "./components/input";
import { createNewProduct, getTodos } from "../models/todos";
import { Form } from "react-router";

export function meta() {
  return [
    { title: "Recreation of todo" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

//function for loading our data into our project

export async function loader() {
  try {
    let result = await getTodos();
    //console log the return value so as to bes sure that the server is running as it should fam
    if (!result) {
      console.error("There was no result from your getTodos() function");
    }
    console.log(result);
    let myTodos = result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return myTodos;
  } catch (error) {
    console.error(`Http error ${result.error}`);
  }
}

export async function action({ request }) {
  try {
    let formData = await request.formData();
    let inputData = formData.get("creator");
    console.log(inputData);

    //defining the data structure of the object

    let todoObj = {
      todo: inputData,
      isChecked: false,
    };

    //creating a new product by calling our helper function form the todos.js file

    let newTodo = await createNewProduct(todoObj); //on form submission it will actually just call the action function and the new product will be created eventually
    return newTodo;
  } catch (error) {
    console.error("Action Error", error);
    return { error: "Failed to create newTodo" };
  }
}

export default function Home({ loaderdata }) {
  console.log({ newTodo: loaderdata });

  return (
    <main>
      <div>
        <div className="hero">
          <img
            className="w-full"
            src="/todo-app-main/images/bg-desktop-dark.jpg"
            alt=""
          />
        </div>
        <div className="justify-self-center w-[700px]">
          <nav className="flex justify-between m-[20px]">
            <h1 className="text-[40px]">ToDo</h1>
            <img
              className="w-[30px] object-cover"
              src="/todo-app-main/images/icon-sun.svg"
              alt=""
            />
          </nav>
          <Form action="" method="post">
            <Input type="text" name="creator" />
          </Form>
          <ul className="flex flex-col gap-[10px] mt-[30px] w-full">
            {loaderdata &&
              Array.isArray(loaderdata) &&
              loaderdata.map((item) => (
                <li key={item._id}>
                  <Label htmlFor={`todo-${item._id}`} text={item.todo} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export function Label({ htmlFor, text }) {
  return (
    <label
      className="p-[10px] w-full font-extralight bg-[#242834] text-white"
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
}
