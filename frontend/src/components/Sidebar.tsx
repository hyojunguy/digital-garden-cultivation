import { NavLink } from 'react-router-dom';
import { 
  SeedIcon, 
  SproutIcon, 
  GrowthIcon, 
  FlowerIcon, 
  FruitIcon, 
  HarvestIcon 
} from './StageIcons';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">성장 단계</h2>
        <nav className="space-y-2">
          <NavLink
            to="/stages/seed"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md ${
                isActive
                  ? 'bg-garden-light text-garden-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <SeedIcon className="h-5 w-5 mr-3" />
            <span>씨앗 단계</span>
          </NavLink>
          <NavLink
            to="/stages/sprout"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md ${
                isActive
                  ? 'bg-garden-light text-garden-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <SproutIcon className="h-5 w-5 mr-3" />
            <span>새싹 단계</span>
          </NavLink>
          <NavLink
            to="/stages/growth"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md ${
                isActive
                  ? 'bg-garden-light text-garden-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <GrowthIcon className="h-5 w-5 mr-3" />
            <span>성장 단계</span>
          </NavLink>
          <NavLink
            to="/stages/flower"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md ${
                isActive
                  ? 'bg-garden-light text-garden-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <FlowerIcon className="h-5 w-5 mr-3" />
            <span>꽃 단계</span>
          </NavLink>
          <NavLink
            to="/stages/fruit"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md ${
                isActive
                  ? 'bg-garden-light text-garden-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <FruitIcon className="h-5 w-5 mr-3" />
            <span>열매 단계</span>
          </NavLink>
          <NavLink
            to="/stages/harvest"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md ${
                isActive
                  ? 'bg-garden-light text-garden-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <HarvestIcon className="h-5 w-5 mr-3" />
            <span>수확 단계</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;