import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  readonly options: ComboboxOption[]
  readonly value?: string | string[]
  readonly onValueChange?: (value: string | string[]) => void
  readonly placeholder?: string
  readonly searchPlaceholder?: string
  readonly emptyText?: string
  readonly className?: string
  readonly id?: string
  readonly multiple?: boolean
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Seleccionar...',
  searchPlaceholder = 'Buscar...',
  emptyText = 'No se encontraron resultados.',
  className,
  id,
  multiple = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  let selectedValues: string[] = []
  if (Array.isArray(value)) {
    selectedValues = value
  } else if (value) {
    selectedValues = [value]
  }

  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value)
  )

  const handleSelect = (selectedValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(selectedValue)
        ? selectedValues.filter((v) => v !== selectedValue)
        : [...selectedValues, selectedValue]
      onValueChange?.(newValues)
    } else {
      onValueChange?.(selectedValue === value ? '' : selectedValue)
      setOpen(false)
    }
  }

  let displayText = placeholder
  if (selectedOptions.length > 0) {
    displayText =
      selectedOptions.length === 1
        ? selectedOptions[0].label
        : `${selectedOptions.length} seleccionados`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          aria-expanded={open}
          className={cn('border-border w-full justify-between', className)}
        >
          {displayText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedValues.includes(option.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
