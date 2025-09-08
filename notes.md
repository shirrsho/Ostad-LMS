# React Data & Authentication
Where Do I Store My Data?
In a React app, you often need to save and access data. We have two main places to store data on the user's side:

## Cookies
What it is: Tiny notes that the server saves on your computer.

Best for: User sessions. They're perfect for remembering that you're logged in.

The catch: Cookies are automatically sent with every request to the server, so you can't put a lot of info in them.

## Local Storage
What it is: A small storage box inside your web browser.

Best for: User settings and simple data that doesn't need to go to the server. For example, saving the user's preference for "dark mode."

The catch: Data stays forever unless you clear it. It's also not sent automatically with requests.

# The Problem with "Prop Drilling"
Imagine you have a piece of information (like a user's name) that many components need. With props, you have to pass it down, one by one, through every single component in the chain, even if they don't use it!

This is called prop drilling, and it can get messy!

# The React Context API
Context is the solution to prop drilling! It creates a central place for data that any component can access directly.

Provider: The parent component that provides the data.

Consumer: Any child component that consumes the data.

It's a way to "skip the line" and get the data you need without passing it through every component.

# What's a JWT?
A JSON Web Token (JWT) is a special, signed key used for proving who you are.

Think of it like a special concert ticket:

When you log in, the server gives you a unique ticket (the JWT).

Your app saves this ticket in a safe place (usually Local Storage).

Whenever you ask the server for something protected (like your profile page), you show it your ticket.

The server can quickly check if the ticket is real and hasn't been tampered with.

It's a fast, secure way to handle user authentication.