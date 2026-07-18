import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Student } from "@/types/user";
import { supabase } from "@/supabase-client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderCircle, Pencil, X, Check } from "lucide-react";

function ProfileTab() {
  const { currentUser, updateStudent, loading } = useUser();
  const student = currentUser as Student;

  const [isEditing, setIsEditing] = useState(false);

  // form state — initialized from currentUser
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [middleName, setMiddleName] = useState(student.middleName ?? "");
  const [suffix, setSuffix] = useState(student.suffix ?? "");
  const [idNumber, setIdNumber] = useState(student.idNumber);
  const [yearLevel, setYearLevel] = useState(String(student.yearLevel));
  const [email, setEmail] = useState(student.email);
  const [contactNumber, setContactNumber] = useState(
    student.contactNumber ?? "",
  );

  function handleCancel() {
    // reset to current values
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setMiddleName(student.middleName ?? "");
    setSuffix(student.suffix ?? "");
    setIdNumber(student.idNumber);
    setYearLevel(String(student.yearLevel));
    setEmail(student.email);
    setContactNumber(student.contactNumber ?? "");
    setIsEditing(false);
  }

  async function handleSave() {
    updateStudent(student.studentRowId, student.id, {
      firstName,
      lastName,
      middleName: middleName || undefined,
      // suffix: suffix || undefined,
      idNumber,
      yearLevel: Number(yearLevel),
      email,
      contactNumber: contactNumber || undefined,
    });

    setIsEditing(false);
  }

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Profile</CardTitle>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              className="h-fit p-2 gap-1"
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={14} />
              Edit
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-fit p-2 gap-1 text-muted-foreground"
              onClick={handleCancel}
            >
              <X size={14} />
              Cancel
            </Button>
          )}
        </CardHeader>

        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>First Name</FieldLabel>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                />
              </Field>

              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Middle Name</FieldLabel>
                <Input
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Optional"
                />
              </Field>

              <Field>
                <FieldLabel>Suffix</FieldLabel>
                <Input
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Jr., Sr., III"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel>ID Number</FieldLabel>
              <Input
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                disabled={!isEditing}
              />
            </Field>

            <Field>
              <FieldLabel>Year Level</FieldLabel>
              {isEditing ? (
                <Select
                  value={yearLevel}
                  onValueChange={(value) => setYearLevel(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">1st</SelectItem>
                      <SelectItem value="2">2nd</SelectItem>
                      <SelectItem value="3">3rd</SelectItem>
                      <SelectItem value="4">4th</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={`${yearLevel}${["st", "nd", "rd", "th"][Number(yearLevel) - 1]} Year`}
                  disabled
                />
              )}
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                type="email"
              />
            </Field>

            <Field>
              <FieldLabel>Contact Number</FieldLabel>
              <Input
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                disabled={!isEditing}
                placeholder="09123456789"
                type="text"
              />
            </Field>
          </FieldGroup>
        </CardContent>

        {isEditing && (
          <CardFooter>
            <Button
              className="w-full h-fit p-2 gap-1"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <>
                  <Check size={14} />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default ProfileTab;
