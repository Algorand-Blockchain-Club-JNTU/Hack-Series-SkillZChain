"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, Twitter, MessageSquare, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { submitJoinForm } from "@/app/join/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  experience: z.string().min(1, { message: "Please select your gaming experience." }),
  interests: z.array(z.string()).min(1, { message: "Please select at least one interest." }),
  message: z.string().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experience: "",
      interests: [],
      message: "",
      agreeTerms: false,
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const result = await submitJoinForm(values)

      if (result.success) {
        // Show success state
        setIsSuccess(true)
        toast({
          title: "Application submitted!",
          description: "We've received your application to join SkillZChain.",
        })
      } else {
        // Show error message
        setErrorMessage(result.error || "Something went wrong. Please try again.")
        toast({
          title: "Submission failed",
          description: result.error || "Your application couldn't be submitted. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.")
      toast({
        title: "Something went wrong.",
        description: "Your application couldn't be submitted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1218] text-white">
      {/* Navigation */}
      <header className="border-b border-slate-800/40 bg-[#0f1218]/70 backdrop-blur-xl fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-white">
              Skill
              <span className="text-2xl md:text-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
                Z
              </span>
              Chain
            </span>
          </Link>
          <ConnectWalletButton />
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300"></div>
      </header>

      {/* Main Content */}
      <div className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!isSuccess ? (
              <>
                <div className="text-center mb-8 md:mb-12">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
                    Join the Revolution
                  </h1>
                  <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg">
                    Be part of the future of skill-based gaming. Fill out the form below to join our community and stay
                    updated on our latest developments.
                  </p>
                </div>

                {errorMessage && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-slate-700/50 shadow-lg shadow-purple-900/10">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your full name"
                                  {...field}
                                  className="bg-slate-900/50 border-slate-700 focus:border-purple-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your email address"
                                  type="email"
                                  {...field}
                                  className="bg-slate-900/50 border-slate-700 focus:border-purple-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                type="tel"
                                {...field}
                                className="bg-slate-900/50 border-slate-700 focus:border-purple-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gaming Experience</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-slate-900/50 border-slate-700 focus:border-purple-500">
                                  <SelectValue placeholder="Select your gaming experience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-slate-800 border-slate-700">
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                                <SelectItem value="professional">Professional</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="interests"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Interests (Select all that apply)</FormLabel>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {[
                                "Trivia Games",
                                "Puzzle Games",
                                "Strategy Games",
                                "Competitive Gaming",
                                "Blockchain Technology",
                                "NFTs",
                              ].map((interest) => (
                                <FormField
                                  key={interest}
                                  control={form.control}
                                  name="interests"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={interest}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(interest)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, interest])
                                                : field.onChange(field.value?.filter((value) => value !== interest))
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">{interest}</FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Message (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us why you're interested in joining SkillZChain"
                                className="bg-slate-900/50 border-slate-700 focus:border-purple-500 min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="agreeTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I agree to the{" "}
                                <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline">
                                  terms and conditions
                                </Link>
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-medium py-6 text-lg rounded-full"
                      >
                        {isSubmitting ? "Submitting..." : "Join SkillZChain"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </>
            ) : (
              <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-8 md:p-12 border border-slate-700/50 shadow-lg shadow-purple-900/10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-500/20 p-4 rounded-full">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Application Submitted!</h2>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                  Thank you for your interest in joining SkillZChain! We've received your application and will be in
                  touch soon. Check your email for a confirmation message.
                </p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-medium px-8 py-3 rounded-full">
                    Return to Home <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-800/50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="text-xl md:text-2xl font-bold text-white">
                  Skill
                  <span className="text-2xl md:text-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
                    Z
                  </span>
                  Chain
                </span>
              </Link>
              <p className="text-slate-400 text-xs md:text-sm">
                The future of skill-based competitive gaming on the blockchain.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Platform</h3>
              <ul className="space-y-2 text-slate-400 text-xs md:text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/arenas" className="hover:text-white transition">
                    Battlegrounds
                  </Link>
                </li>
                <li>
                  <Link href="/games" className="hover:text-white transition">
                    Games
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h3>
              <ul className="space-y-2 text-slate-400 text-xs md:text-sm">
                <li>
                  <Link href="/docs" className="hover:text-white transition">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Connect</h3>
              <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
                <Link href="https://twitter.com" className="text-slate-400 hover:text-white transition">
                  <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
                <Link href="https://discord.com" className="text-slate-400 hover:text-white transition">
                  <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
                <Link href="https://github.com" className="text-slate-400 hover:text-white transition">
                  <Github className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Powered by</span>
                <a
                  href="https://algorand.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm font-medium text-slate-400 hover:text-white transition"
                >
                  Algorand
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
            <p className="text-slate-500 text-xs md:text-sm">
              &copy; {new Date().getFullYear()} SkillZChain. All rights reserved.
              <span className="mx-1">·</span>
              <Link href="/admin" className="text-slate-500 hover:text-slate-500">
                .
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
