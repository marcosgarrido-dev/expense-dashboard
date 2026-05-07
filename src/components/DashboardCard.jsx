function DashboardCard({ title, value, type }) {
  return (
    <div className={`dashboard-card ${type}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}

export default DashboardCard