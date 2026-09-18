import useSWR from "swr";

const getMemberAttendants = (attendants) => {
  const memberAttendants = attendants.filter(
    (attendant) => attendant.has_voting_rights,
  );
  return memberAttendants;
};

const AttendantPanel = ({ currentMeeting }) => {
  const { data: attendants, mutate: _ } = useSWR(
    () => `/voting/attendants/?meeting_id=${currentMeeting.id}`,
    { refreshInterval: 4000 },
  );

  if (attendants === null) return;

  return (
    <div>
      <h2>Deltagare</h2>

      <div>
        <p>{`Röstlängd: ${
          attendants ? getMemberAttendants(attendants).length : 0
        }`}</p>
      </div>
    </div>
  );
};

export default AttendantPanel;
