import { useState } from "react";
import { supabase } from "@/supabase-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "@/context/UserContext";

function ResetPasswordTab() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { logoutCurrentUser } = useUser();

  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password.");
      return;
    }

    // sign out the temporary session after password reset
    await supabase.auth.signOut();
    logoutCurrentUser(); // clears currentUser from context state

    toast.success("Password reset successfully.");
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-sm p-6 border rounded-xl shadow-sm bg-secondary">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPassword && (
            <p
              className={`text-xs ${password === confirmPassword ? "text-green-600" : "text-destructive"}`}
            >
              {password === confirmPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </p>
          )}
          <Button type="submit" className="w-full h-fit p-2">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordTab;
