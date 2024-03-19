import React, { ReactNode, SetStateAction, useMemo, useState } from "react";
import { ReactSortable, Sortable } from "react-sortablejs";

const LINE_INDEX = {
  B: 1,
  C: 2,
  F: 3,
} as const;

type BCF = "B" | "C" | "F";
const BCF = ["B", "C", "F"] as const;

type User = {
  id: string;
  type: BCF;
  orgName: string;
  userName: string;
  enableDelete: boolean;
  enableLineEdit: boolean;
  enableOrderEdit: boolean;
};

type BCFLine = {
  id: BCF;
  users: User[];
};

const state = [
  {
    id: BCF[0],
    users: [
      {
        id: "1",
        type: BCF[0],
        orgName: "hiworks",
        userName: "mia",
        enableDelete: false,
        enableLineEdit: false,
        enableOrderEdit: false,
      },
    ],
  },
  {
    id: BCF[0],
    users: [
      {
        id: "2",
        type: BCF[0],
        orgName: "hiworks",
        userName: "gilbert",
        enableDelete: false,
        enableLineEdit: false,
        enableOrderEdit: true,
      },
      {
        id: "3",
        type: BCF[0],
        orgName: "hiworks",
        userName: "justin",
        enableDelete: true,
        enableLineEdit: true,
        enableOrderEdit: true,
      },
    ],
  },
  {
    id: BCF[1],
    users: [
      {
        id: "4",
        type: BCF[1],
        orgName: "cloud",
        userName: "tei",
        enableDelete: true,
        enableLineEdit: true,
        enableOrderEdit: true,
      },
      {
        id: "5",
        type: BCF[1],
        orgName: "cloud",
        userName: "uta",
        enableDelete: true,
        enableLineEdit: true,
        enableOrderEdit: true,
      },
    ],
  },
  {
    id: BCF[2],
    users: [
      {
        id: "6",
        type: BCF[2],
        orgName: "hiworks",
        userName: "hyunjae",
        enableDelete: true,
        enableLineEdit: true,
        enableOrderEdit: true,
      },
      {
        id: "7",
        type: BCF[2],
        orgName: "hiworks",
        userName: "younghoon",
        enableDelete: true,
        enableLineEdit: true,
        enableOrderEdit: true,
      },
      {
        id: "7",
        type: BCF[2],
        orgName: "hiworks",
        userName: "hyunjae younghoon hahahaha",
        enableDelete: true,
        enableLineEdit: true,
        enableOrderEdit: true,
      },
    ],
  },
];

const getLineEditClass = (type: BCF) => {
  if (type === "B") return "c-ignore f-ignore";
  if (type === "C") return "b-ignore f-ignore";
  if (type === "F") return "c-ignore f-ignore";
};

const LineIndex = ({ start, length }: { start: number; length: number }) => (
  <div className="flex flex-col justify-around border-2 border-indigo-600/20 min-w-[32px]">
    {Array.from({ length }, (_, index) => index + start).map((i) => (
      <div key={i} className="text-center">
        {i}
      </div>
    ))}
  </div>
);

const LineHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center border-2 border-indigo-600/20">
      {children}
    </div>
  );
};

const UserItem = ({ user, type }: { user: User; type: BCF }) => {
  const { userName, enableLineEdit, orgName } = user;
  return (
    <div
      key={userName}
      className={`flex border-2 border-indigo-600/50 m-1 p-1 w-[124px] h-[64px] ${
        !enableLineEdit ? getLineEditClass(type) : ""
      }`}
      title={userName}
    >
      <div className="overflow-hidden whitespace-nowrap">
        <div className="truncate">{userName}</div>
        <div className="truncate">{orgName}</div>
      </div>
      <div>X</div>
    </div>
  );
};

export default function DND() {
  const [line, setLine] = useState<BCFLine[]>(state);
  const [ignore, setIgnore] = useState<boolean>(false);

  const bStart = 2;
  const bLength = useMemo(() => line[LINE_INDEX.B].users.length, [line]);
  const cStart = useMemo(() => bStart + bLength, [bLength]);
  const cLength = useMemo(() => line[LINE_INDEX.C].users.length, [line]);

  return (
    <>
      <div className="border-2 border-indigo-600">
        <div className="flex gap-4">
          <LineIndex start={1} length={1} />
          <LineHeader>신청</LineHeader>
          <UserItem user={line[0].users[0]} type={"B"} />
        </div>

        <div className="flex gap-4">
          <LineIndex start={bStart} length={bLength} />
          <LineHeader>신청</LineHeader>
          <SortableUserItems
            {...{
              type: "B",
              users: line[LINE_INDEX.B].users,
              setLine,
              ignore,
              setIgnore,
            }}
          />
        </div>

        <div className="flex gap-4">
          <LineIndex start={cStart} length={cLength} />
          <LineHeader>처리</LineHeader>
          <SortableUserItems
            {...{
              type: "C",
              users: line[LINE_INDEX.C].users,
              setLine,
              ignore,
              setIgnore,
            }}
          />
        </div>
      </div>
      <div>
        <div>참조</div>
        <div className="border-2 border-indigo-600 min-h-[100px] flex flex-row">
          <SortableUserItems
            {...{
              type: "F",
              users: line[LINE_INDEX.F].users,
              setLine,
              ignore,
              setIgnore,
              options: {
                className: "flex",
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

const SortableUserItems = ({
  type,
  ignore,
  setIgnore,
  users,
  setLine,
  options,
}: {
  type: BCF;
  ignore: boolean;
  setIgnore: React.Dispatch<React.SetStateAction<boolean>>;
  users: User[];
  setLine: React.Dispatch<React.SetStateAction<BCFLine[]>>;
  options?: object;
}) => (
  <>
    <ReactSortable
      onChange={(evt) => {
        if (evt.item.classList.contains(`${type.toLowerCase()}-ignore`))
          setIgnore(true);
      }}
      list={users}
      setList={(newUsers: User[]) => {
        console.log(options);
        if (!ignore)
          setLine((prev) => {
            const newLine = [...prev];
            newLine[LINE_INDEX[type]].users = newUsers;
            return newLine;
          });
        setIgnore(false);
      }}
      group="user"
      {...options}
    >
      {users.map((user) => (
        <UserItem key={user.userName} type={type} user={user} />
      ))}
    </ReactSortable>
  </>
);
