import React from 'react'

export default function About() {
  return (
    <div className="container text-center">
      <h1 className="mb-4">Food Tracker</h1>
      <p className="lead">To log food do the following</p>
      <ul className="list-unstyled">
        <li>Create user</li>
        <li>Add Food selecting user</li>
        <li>Check food list after logging</li>
      </ul>
      <p className="lead">A full-stack application built with:</p>
      <ul className="list-unstyled">
        <li>Express - server</li>
        <li>React - front-end framework</li>
        <li>Node.js - back-end framework</li>
        <li>React Router - routing</li>
        <li>Bootstrap - styling</li>
      </ul>
    </div>
  )
}
