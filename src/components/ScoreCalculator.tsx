"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Activity {
  name: string
  scores: number[]
}

export default function ScoreCalculator() {
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])
  const [newActivityName, setNewActivityName] = useState("")

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    const storedActivities = localStorage.getItem("activities")

    if (storedUsername) {
      setUsername(storedUsername)
      setIsLoggedIn(true)
    }

    if (storedActivities) {
      setActivities(JSON.parse(storedActivities))
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      localStorage.setItem("username", username)
      setIsLoggedIn(true)
    }
  }

  const handleAddActivity = () => {
    const newActivity: Activity = {
      name: newActivityName.trim() || `Activity ${activities.length + 1}`,
      scores: Array(8).fill(0),
    }
    const updatedActivities = [...activities, newActivity]
    setActivities(updatedActivities)
    setNewActivityName("")
    localStorage.setItem("activities", JSON.stringify(updatedActivities))
  }

  const handleScoreChange = (activityIndex: number, teamIndex: number, value: string) => {
    const updatedActivities = [...activities]
    updatedActivities[activityIndex].scores[teamIndex] = Number.parseInt(value) || 0
    setActivities(updatedActivities)
    localStorage.setItem("activities", JSON.stringify(updatedActivities))
  }

  const calculateTotal = (teamIndex: number) => {
    return activities.reduce((total, activity) => total + activity.scores[teamIndex], 0)
  }

  if (!isLoggedIn) {
    return (
      <form onSubmit={handleLogin} className="max-w-sm mx-auto">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full p-2 border rounded mb-2 text-black"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    )
  }

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <Image src="/placeholder.svg" alt="FIKA Logo" width={50} height={50} className="mr-2" />
        <h2 className="text-xl font-semibold">Welcome, {username}</h2>
      </div>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newActivityName}
          onChange={(e) => setNewActivityName(e.target.value)}
          placeholder="New activity name (optional)"
          className="p-2 border rounded mr-2 flex-grow"
        />
        <button onClick={handleAddActivity} className="bg-green-500 text-white p-2 rounded">
          Add Activity
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Activity</th>
              {Array.from({ length: 8 }, (_, i) => (
                <th key={i} className="border p-2">
                  Team {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, activityIndex) => (
              <tr key={activityIndex}>
                <td className="border p-2">{activity.name}</td>
                {activity.scores.map((score, teamIndex) => (
                  <td key={teamIndex} className="border p-2">
                    <input
                      type="number"
                      value={score}
                      onChange={(e) => handleScoreChange(activityIndex, teamIndex, e.target.value)}
                      className="w-full p-1 border rounded"
                      placeholder={`Score for Team ${teamIndex + 1}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="font-bold bg-gray-200">
              <td className="border p-2">Total</td>
              {Array.from({ length: 8 }, (_, i) => (
                <td key={i} className="border p-2">
                  {calculateTotal(i)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

