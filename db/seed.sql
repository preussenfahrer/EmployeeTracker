INSERT INTO employees_db.department (name) 
VALUES 
("Sales"),
("IT"),
("Security"),
("Testing"),
("Accounting"),
("Advertising")

INSERT INTO employees_db.role(title, salary, department_id)
VALUES
("Sales Manager", 150000, 1),
("Assistant Sales Manager", 95000, 1),
("Regional Sales Manager", 80000, 1),
("Systems Engineer", 78000, 1),
("Senior Developer", 80000, 1),
("Junior Developer", 70000, 1),
("Systems Specialist", 60000, 2),
("Systems Security Analyst", 58000, 2),
("Manager", 90000, 3),
("Tester", 60000, 3),
("Senior Accountant", 80000, 4),
("Junior Accountant", 70000, 4),
("Controller", 80000, 4),
("Advertising Manager", 85000, 5),
("Advertising Executive", 75000, 5),
("Junior Advertising Executive", 65000, 5)

INSERT INTO employees_db.employee (first_name, last_name, role_id, manager_id) VALUES 
("Greg", "Tester", NULL, NULL);