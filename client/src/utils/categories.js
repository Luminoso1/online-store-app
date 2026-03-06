import { BeansIcon } from '../components/icons/beans'
import { CleanerIcon } from '../components/icons/cleaner'
import { FruitsIcon } from '../components/icons/fruits'
import { MilkIcon } from '../components/icons/milk'
import { ProteinIcon } from '../components/icons/protein'
import { SnackIcon } from '../components/icons/snakc'
import { VegetableIcon } from '../components/icons/vegetable'

const categories = [
  {
    text: 'all'
  },
  {
    icon: FruitsIcon,
    text: 'fruits'
  },
  {
    icon: VegetableIcon,
    text: 'vegetables'
  },
  {
    icon: MilkIcon,
    text: 'dairies'
  },

  {
    icon: ProteinIcon,
    text: 'protein'
  },

  {
    icon: BeansIcon,
    text: 'beans'
  },

  {
    icon: SnackIcon,
    text: 'snacks'
  },

  {
    icon: CleanerIcon,
    text: 'cleaners'
  }
]

export default categories
