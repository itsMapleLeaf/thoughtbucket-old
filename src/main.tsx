import React from "react"
import ReactDOM from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { Router } from "wouter"
import { App } from "./app/App"
import "./style.css"

const client = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={client}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </QueryClientProvider>,
  document.getElementById("root"),
)
