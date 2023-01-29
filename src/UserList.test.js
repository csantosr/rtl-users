import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

const renderComponent = () => {
  const users = [
    { name: "Jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];
  render(<UserList users={users} />);

  return { users };
};

test("Render one row per user", () => {
  renderComponent();

  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  expect(rows).toHaveLength(2);
});

test("Render the email and name of each user", () => {
  const { users } = renderComponent();

  users.forEach(({ name, email }) => {
    const nameCell = screen.getByRole("cell", { name });
    expect(nameCell).toBeInTheDocument();

    const emailCell = screen.getByRole("cell", { name: email });
    expect(emailCell).toBeInTheDocument();
  });
});
