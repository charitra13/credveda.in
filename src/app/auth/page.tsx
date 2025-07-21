"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-light">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
            <CardDescription>
              Sign in or create an account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <svg
                className="w-5 h-5 mr-2"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 256S109.8 0 244 0c73.2 0 136.2 29.2 182.4 75.4l-62.4 62.4C337.2 113.2 295.6 96 244 96c-88.6 0-160 71.6-160 160s71.4 160 160 160c92.8 0 140.3-63.6 144.6-95.2H244v-64h243.6c1.2 6.8 1.8 13.8 1.8 21z"
                ></path>
              </svg>
              Sign In with Google
            </Button>
          </CardContent>
          <CardFooter className="text-center text-xs text-gray-dark">
            <p>
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
