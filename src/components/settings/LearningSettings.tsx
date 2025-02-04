import { Book, Globe, Bell, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface LearningPreferencesProps {
  language: string
  setLanguage: (language: string) => void
  studyReminders: boolean
  setStudyReminders: (enabled: boolean) => void
  emailNotifications: boolean
  setEmailNotifications: (enabled: boolean) => void
}

export function LearningPreferences({
  language,
  setLanguage,
  studyReminders,
  setStudyReminders,
  emailNotifications,
  setEmailNotifications,
}: LearningPreferencesProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5" />
          Learning Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <Label htmlFor="language-select" className="text-sm font-medium">
              Learning Language
            </Label>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language-select" className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="mandarin">Mandarin</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <Label htmlFor="study-reminders-switch" className="text-sm font-medium">
              Study Reminders
            </Label>
          </div>
          <Switch id="study-reminders-switch" checked={studyReminders} onCheckedChange={setStudyReminders} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <Label htmlFor="email-notifications-switch" className="text-sm font-medium">
              Email Notifications
            </Label>
          </div>
          <Switch
            id="email-notifications-switch"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
      </CardContent>
    </Card>
  )
}

