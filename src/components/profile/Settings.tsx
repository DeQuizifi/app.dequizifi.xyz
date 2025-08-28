export default function Settings() {
  return (
    <div className="bg-white rounded-t-3xl min-h-[70vh] max-h-[85vh] p-6 overflow-y-auto">
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Profile Settings</h2>
        <div className="space-y-4">
          {/* Example settings options */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Change Username</label>
            <input
              type="text"
              className="border rounded px-3 py-2"
              placeholder="Enter new username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Change Password</label>
            <input
              type="password"
              className="border rounded px-3 py-2"
              placeholder="Enter new password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Notification Preferences</label>
            <select className="border rounded px-3 py-2">
              <option>Email</option>
              <option>SMS</option>
              <option>Push Notification</option>
              <option>None</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Theme</label>
            <select className="border rounded px-3 py-2">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-violet-400 text-white rounded hover:bg-violet-800 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
