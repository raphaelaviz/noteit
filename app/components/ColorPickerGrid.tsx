

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
  '#FFB6C1',
  '#FFD700',
  '#F0E68C',
  '#ADFF2F',
  '#00FF7F',
  '#20B2AA',
  '#87CEFA',
  '#0000FF',
  '#8A2BE2',
  '#D8BFD8',
  '#DDA0DD',
  '#FF00FF',
  '#FF4500',
  '#DB7093',
  '#F5DEB3',
  '#7B68EE',
]

export default ColorPickerGrid
