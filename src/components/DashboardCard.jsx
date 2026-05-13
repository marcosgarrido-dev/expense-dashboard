function DashboardCard({ title, value, type, onClick, isActive }) {
  return (
    <div
      className={`dashboard-card ${type} ${isActive ? "active-card" : ""}`}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}

export default DashboardCard