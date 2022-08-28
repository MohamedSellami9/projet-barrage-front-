import "./barrage.scss"
import Sidebar from "../../components/sidebar/Sidebar"

import BarrageTable from "../../components/BarrageTable/barrageTable"

const Barrage = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <BarrageTable />
      </div>
    </div>
  )
}

export default Barrage;