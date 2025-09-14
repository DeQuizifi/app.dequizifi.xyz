export default function Settings() {
  return (
    <div className="bg-card rounded-t-3xl min-h-[70vh] max-h-[85vh] p-6 overflow-y-auto">
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-foreground">
          Profile Settings
        </h2>
        <div className="space-y-4">
          {/* Example settings options */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-foreground">
              Change Username
            </label>
            <input
              type="text"
              className="border border-border rounded px-3 py-2 bg-background text-foreground"
              placeholder="Enter new username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-foreground">
              Change Password
            </label>
            <input
              type="password"
              className="border border-border rounded px-3 py-2 bg-background text-foreground"
              placeholder="Enter new password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-foreground">
              Notification Preferences
            </label>
            <select className="border border-border rounded px-3 py-2 bg-background text-foreground">
              <option>Email</option>
              <option>SMS</option>
              <option>Push Notification</option>
              <option>None</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-foreground">Theme</label>
            <select className="border border-border rounded px-3 py-2 bg-background text-foreground">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
