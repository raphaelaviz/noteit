

interface ColorPickerGridProps {
  onColorSelect: (color: string) => void
  selectedColor: string
}

const ColorPickerGrid = ({
  onColorSelect,
  selectedColor,
}: ColorPickerGridProps) => (
  <div className="mt-2 flex-center space-x-1 rounded-lg border-2 border-gray-500 border-opacity-5 p-2">

    {colors.map((color) => (
      <div
        key={color}
        onClick={() => onColorSelect(color)}
        style={{ backgroundColor: color }}
        className={`h-6 w-6 cursor-pointer border-2
          ${color === selectedColor ? 'border-black' : 'border-none'} shadow`}
      />
    ))}
  </div>
)

const colors = [
  '#aaaaaa',
  '#F0E68C',
  '#dfff60',
  '#FFD700',
  '#bcfa60',
  '#60ffa7',
  '#00FF7F',
  '#87CEFA',
  '#66abe7',
  '#20B2AA',
  '#7f79f7',
  '#FFB6C1',
  '#D8BFD8',
  '#DDA0DD',
  '#c362c3',
  '#f7855b',
  '#ef6815',
  '#ed6565',
]

export default ColorPickerGrid
