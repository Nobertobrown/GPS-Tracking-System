import { useState, useEffect } from "react";
import {
  useFloating,
  offset,
  autoUpdate,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
} from "@floating-ui/react";

import {
  IoAlertOutline,
  IoNotificationsOutline,
  IoTimeOutline,
} from "react-icons/io5";

import { useQueryClient } from "@tanstack/react-query";
import { Query } from "../services/external-api.service";
import openSocket from "socket.io-client";

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const queryClient = useQueryClient();

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-end",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const args = {
          key: "getNotifications",
          method: "GET",
          route: "/notification",
        };
        
        const res = await queryClient.fetchQuery(Query(args));

        if (res && res.notifications) {
          setNotifications(res.notifications);
        }
      } catch (error) {
        if(error.response.status == 404){
          return setNotifications([])
        }
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const socket = openSocket(import.meta.env.VITE_BASE_URL);
    socket.on("notification", (data) => {
      if (data.action === "create") {
        setNotifications((prev) => {
          return [...prev, data.note];
        });
      } else if (data.action === "delete") {
        fetchNotifications();
      }
    });

    return () => {
      socket.off("notification");
    };
  }, [queryClient]);

  return (
    <>
      <a
        className="inline-flex items-center relative justify-center transition-all duration-300 ease-linear size-10 text-slate-500 hover:text-blue-500 active:text-blue-500"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <IoNotificationsOutline className="text-xl group-hover/item:fill-blue-50" />
        {notifications.length > 0 && (
          <span className="absolute top-1.5 right-1.5 flex w-1.5 h-1.5">
            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-sky-500"></span>
          </span>
        )}
      </a>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="text-left bg-white outline-none rounded-md shadow-md max-w-[26rem] min-w-[20rem]"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <div className="p-4">
              <h2 className="flex items-center">
                Notifications{" "}
                <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-[11px] font-medium border rounded-full text-white bg-orange-500 border-orange-500">
                  {notifications.length}
                </span>
              </h2>
            </div>
            <div className="max-h-[350px] overflow-y-scroll">
              <div className="flex flex-col">
                {notifications.length < 1 ? (
                  <h3 className="self-center py-6">No notifications found!</h3>
                ) : (
                  notifications.map((note, idx) => (
                    <a key={idx} className="flex gap-3 p-4 hover:bg-slate-50">
                      <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-md shrink-0">
                        <IoAlertOutline className="text-red-500 text-xl" />
                      </div>
                      <div className="grow">
                        <h6 className="mb-1 font-medium">
                          {note.content}{" "}
                          <span className="text-red-500">$99.9</span>
                        </h6>
                        <p className="mb-0 text-sm text-slate-500">
                          <IoTimeOutline className="inline-block text-sm mr-1" />
                          <span className="align-middle">{note._id}</span>
                        </p>
                      </div>
                      <div className="flex items-center self-start gap-2 text-xs text-slate-500 shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        1 Week
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

export default NotificationBell;
