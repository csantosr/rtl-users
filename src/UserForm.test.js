import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("It shows two inputs and a button", () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("It calls onUserAdd when the form is submitted", () => {
  const onUserAddMock = jest.fn();

  render(<UserForm onUserAdd={onUserAddMock} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  user.click(nameInput);
  user.keyboard("Jane");

  user.click(emailInput);
  user.keyboard("jane@jane.com");

  const button = screen.getByRole("button");

  user.click(button);

  expect(onUserAddMock).toHaveBeenCalled();
  expect(onUserAddMock).toHaveBeenCalledWith({
    name: "Jane",
    email: "jane@jane.com",
  });
});
