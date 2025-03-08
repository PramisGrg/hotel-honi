import OwnerOnBaording from "@/components/onbaording/owner-onboarding";
import SidebarOnboarding from "@/components/onbaording/sidebar-onboarding";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { useGetInvitations } from "@/queries/invitations/get-invitation-query";
import { useInvitationAction } from "@/queries/invitations/invitation-action";
import { Hotel, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Hotel {
  name: string;
  id: string;
}

interface Invitation {
  createdAt: string;
  hotel: Hotel;
  id: string;
  role: string;
  status: string;
  updatedAt: string;
}

interface InvitationsResponse {
  data: Invitation[];
}

interface InvitationAction {
  invitationId: string;
  status: "ACCEPTED" | "REJECTED";
}

const OnBoarding = () => {
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(true);
  const { data, refetch } = useGetInvitations() as {
    data?: InvitationsResponse;
    refetch: () => void;
  };

  const invitationAction = useInvitationAction();

  useEffect(() => {
    if (invitationAction.isSuccess) {
      const status = invitationAction.variables?.status;
      if (status === "ACCEPTED") {
        navigate("/dashboard/home");
      } else {
        refetch();
      }
    }
  }, [
    invitationAction.isSuccess,
    invitationAction.variables?.status,
    navigate,
    refetch,
  ]);

  const sidebar = useStore(useSidebar, (x) => x);

  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;

  const handleInvitationAction = (status: "ACCEPTED" | "REJECTED") => {
    const invitationId = data?.data[0]?.id;

    if (!invitationId) {
      console.error("No invitation ID found");
      return;
    }

    const actionData: InvitationAction = {
      invitationId,
      status,
    };

    invitationAction.mutate(actionData);
  };

  const renderStaffView = () => {
    if (!data?.data?.length) {
      return (
        <div className="space-y-6">
          <div className="flex justify-center">
            <Search className="h-16 w-16 text-blue-600" />
          </div>
          <div className="text-center text-gray-500">No invitations found</div>
        </div>
      );
    }

    const invitation = data.data[0];
    return (
      <div className="space-y-4 w-full">
        <div className="p-4 bg-[#EFECFF] flex justify-between rounded-lg">
          <div>
            <h3 className="font-medium text-lg">{invitation.hotel.name}</h3>
            <p className="text-gray-400 text-sm lowercase">{invitation.role}</p>
          </div>
          <div className="flex text-white items-center gap-2">
            <button
              onClick={() => handleInvitationAction("ACCEPTED")}
              className="p-2 rounded-md bg-green-300 hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={invitationAction.isPending}
            >
              {invitationAction.isPending &&
              invitationAction.variables?.status === "ACCEPTED"
                ? "Accepting..."
                : "Accept"}
            </button>
            <button
              onClick={() => handleInvitationAction("REJECTED")}
              className="p-2 rounded-md bg-red-300 hover:bg-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={invitationAction.isPending}
            >
              {invitationAction.isPending &&
              invitationAction.variables?.status === "REJECTED"
                ? "Rejecting..."
                : "Reject"}
            </button>
          </div>
        </div>
        {invitationAction.isError && (
          <div className="text-red-500 text-sm text-center">
            Error processing invitation. Please try again.
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <SidebarOnboarding />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
        )}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="p-10 rounded-md border space-y-6 bg-white">
            <h1 className="font-semibold text-xl">
              Welcome to <span className="text-primary">RestroFlow</span>
            </h1>
            <h2 className="text-lg text-neutral-500">Are you a hotel owner?</h2>

            <div className="flex space-x-4 w-full rounded-md border p-3">
              <button
                onClick={() => setIsOwner(true)}
                className={cn(
                  "py-2 px-4 rounded-md w-1/2 transition-colors",
                  isOwner ? "bg-red-50" : "hover:bg-gray-50"
                )}
              >
                Yes, I am an owner
              </button>
              <button
                onClick={() => setIsOwner(false)}
                className={cn(
                  "py-2 px-4 rounded-md w-1/2 transition-colors",
                  !isOwner ? "bg-red-50" : "hover:bg-gray-50"
                )}
              >
                No, I am staff
              </button>
            </div>

            <div className="items-center justify-center flex flex-col p-6 space-y-4 w-[450px] border border-dotted">
              {isOwner ? <OwnerOnBaording /> : renderStaffView()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OnBoarding;
