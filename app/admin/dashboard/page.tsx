"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAdminAuth } from "@/utils/admin-auth"
import { getRegistrations, type Registration } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  LogOut,
  Search,
  Users,
  Download,
  Loader2,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  Calendar,
  Tag,
  MessageSquare,
  AlertTriangle,
  Database,
} from "lucide-react"

export default function AdminDashboardPage() {
  const [authState, _, logout] = useAdminAuth()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [tableExists, setTableExists] = useState(true)
  const itemsPerPage = 10
  const router = useRouter()

  // Fetch registrations data
  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error, tableNotFound } = await getRegistrations()

        if (tableNotFound) {
          setTableExists(false)
          setError("The registrations table does not exist in your database.")
        } else if (error) {
          setError("Failed to fetch registrations. Please try again.")
        } else if (data) {
          setRegistrations(data)
          setFilteredRegistrations(data)
        }
      } catch (err) {
        setError("An unexpected error occurred.")
      } finally {
        setIsLoading(false)
      }
    }

    if (!authState.isLoading && authState.isAuthenticated) {
      fetchData()
    }
  }, [authState])

  // Redirect if not authenticated
  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push("/admin")
    }
  }, [authState, router])

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRegistrations(registrations)
    } else {
      const filtered = registrations.filter(
        (reg) =>
          reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.experience.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredRegistrations(filtered)
    }
    setCurrentPage(1) // Reset to first page on new search
  }, [searchTerm, registrations])

  // Handle logout
  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  // Handle CSV export
  const exportToCSV = () => {
    // Create CSV header
    const headers = ["ID", "Name", "Email", "Phone", "Experience", "Interests", "Message", "Created At"]

    // Convert registrations to CSV rows
    const csvRows = [
      headers.join(","),
      ...registrations.map((reg) => {
        return [
          reg.id,
          `"${reg.name.replace(/"/g, '""')}"`, // Escape quotes in CSV
          `"${reg.email.replace(/"/g, '""')}"`,
          reg.phone ? `"${reg.phone.replace(/"/g, '""')}"` : "",
          `"${reg.experience.replace(/"/g, '""')}"`,
          `"${reg.interests.join(", ").replace(/"/g, '""')}"`,
          reg.message ? `"${reg.message.replace(/"/g, '""')}"` : "",
          new Date(reg.created_at).toLocaleString(),
        ].join(",")
      }),
    ]

    // Create and download CSV file
    const csvString = csvRows.join("\n")
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `skillzchain-registrations-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, startIndex + itemsPerPage)

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-[#0f1218] flex items-center justify-center">
        <div className="text-white text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f1218]">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-white">
              Skill
              <span className="text-2xl md:text-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
                Z
              </span>
              Chain Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
                View Website
              </Button>
            </Link>
            <Button onClick={handleLogout} className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
              <LogOut className="mr-1 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Manage and monitor SkillZChain registrations</p>
        </div>

        {!tableExists ? (
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-4">Database Table Not Found</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              The "registrations" table doesn't exist in your Supabase database yet. You need to create this table
              before you can view registrations.
            </p>
            <div className="bg-slate-900/70 rounded-lg p-6 mb-6 max-w-2xl mx-auto text-left">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Database className="h-5 w-5 mr-2 text-purple-400" /> SQL to Create Table
              </h3>
              <pre className="bg-slate-950 p-4 rounded-md overflow-x-auto text-sm text-slate-300">
                {`CREATE TABLE public.registrations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  experience TEXT NOT NULL,
  interests TEXT[] NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
              </pre>
            </div>
            <p className="text-slate-400 mb-6">
              Run this SQL in your Supabase SQL Editor to create the table, then refresh this page.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://supabase.com/dashboard/project/_/sql"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-medium px-6 py-3 rounded-md inline-flex items-center"
              >
                Open Supabase SQL Editor
              </a>
              <Button onClick={() => window.location.reload()} className="bg-slate-700 hover:bg-slate-600">
                Refresh Page
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2">
                  <CardDescription className="text-slate-400">Total Registrations</CardDescription>
                  <CardTitle className="text-2xl text-white">{registrations.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-purple-400">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">All-time applicants</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Export */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search by name, email or experience..."
                  className="pl-10 bg-slate-800/50 border-slate-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
                <Download className="mr-1 h-4 w-4" /> Export to CSV
              </Button>
            </div>

            {/* Registrations Table */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden mb-6">
              {isLoading ? (
                <div className="p-8 text-center text-slate-400">
                  <Loader2 className="animate-spin h-8 w-8 mx-auto mb-2" />
                  <p>Loading registrations...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-400">
                  <p>{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-red-900/20 text-red-400 hover:bg-red-900/40"
                  >
                    Retry
                  </Button>
                </div>
              ) : filteredRegistrations.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <p>No registrations found{searchTerm ? ` matching "${searchTerm}"` : ""}.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-300">
                    <thead className="bg-slate-800 text-slate-400 text-xs uppercase">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Experience</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedRegistrations.map((reg) => (
                        <tr key={reg.id} className="border-b border-slate-700 hover:bg-slate-800/70">
                          <td className="px-6 py-4 font-medium text-white">{reg.name}</td>
                          <td className="px-6 py-4">{reg.email}</td>
                          <td className="px-6 py-4">
                            <Badge className="bg-purple-600/30 text-purple-300 hover:bg-purple-600/40">
                              {reg.experience}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">{new Date(reg.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <Button
                              onClick={() => {
                                // Show details modal
                                document.getElementById(`modal-${reg.id}`)?.classList.remove("hidden")
                              }}
                              variant="outline"
                              size="sm"
                              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                            >
                              View Details
                            </Button>

                            {/* Modal (hidden by default) */}
                            <div
                              id={`modal-${reg.id}`}
                              className="hidden fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                              onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                  document.getElementById(`modal-${reg.id}`)?.classList.add("hidden")
                                }
                              }}
                            >
                              <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-6">
                                  <h3 className="text-xl font-bold text-white mb-4">Registration Details</h3>

                                  <div className="space-y-4">
                                    <div className="flex gap-3">
                                      <User className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <div className="text-sm text-slate-400">Name</div>
                                        <div className="text-white">{reg.name}</div>
                                      </div>
                                    </div>

                                    <div className="flex gap-3">
                                      <Mail className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <div className="text-sm text-slate-400">Email</div>
                                        <div className="text-white">{reg.email}</div>
                                      </div>
                                    </div>

                                    {reg.phone && (
                                      <div className="flex gap-3">
                                        <Phone className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                          <div className="text-sm text-slate-400">Phone</div>
                                          <div className="text-white">{reg.phone}</div>
                                        </div>
                                      </div>
                                    )}

                                    <div className="flex gap-3">
                                      <Tag className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <div className="text-sm text-slate-400">Experience Level</div>
                                        <div className="text-white">{reg.experience}</div>
                                      </div>
                                    </div>

                                    <div className="flex gap-3">
                                      <Tag className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <div className="text-sm text-slate-400">Interests</div>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                          {reg.interests.map((interest, idx) => (
                                            <Badge key={idx} className="bg-slate-700 text-slate-200">
                                              {interest}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {reg.message && (
                                      <div className="flex gap-3">
                                        <MessageSquare className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                          <div className="text-sm text-slate-400">Message</div>
                                          <div className="text-white">{reg.message}</div>
                                        </div>
                                      </div>
                                    )}

                                    <div className="flex gap-3">
                                      <Calendar className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <div className="text-sm text-slate-400">Registration Date</div>
                                        <div className="text-white">{new Date(reg.created_at).toLocaleString()}</div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-6 flex justify-end">
                                    <Button
                                      onClick={() => {
                                        document.getElementById(`modal-${reg.id}`)?.classList.add("hidden")
                                      }}
                                      className="bg-slate-700 hover:bg-slate-600 text-white"
                                    >
                                      Close
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!isLoading && !error && filteredRegistrations.length > 0 && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-400">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredRegistrations.length)} of{" "}
                  {filteredRegistrations.length} registrations
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    size="sm"
                    variant="outline"
                    className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      size="sm"
                      variant={page === currentPage ? "default" : "outline"}
                      className={
                        page === currentPage
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    size="sm"
                    variant="outline"
                    className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
