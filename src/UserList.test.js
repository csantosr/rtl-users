import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

test("Render one row per user", () => {
  const users = [
    { name: "Jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];
  render(<UserList users={users} />);

  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  expect(rows).toHaveLength(2);
});

test("Render the email and name of each user", () => {
  const users = [
    { name: "Jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];
  render(<UserList users={users} />);

  users.forEach(({ name, email }) => {
    const nameCell = screen.getByRole("cell", { name });
    expect(nameCell).toBeInTheDocument();

    const emailCell = screen.getByRole("cell", { name: email });
    expect(emailCell).toBeInTheDocument();
  });
});
