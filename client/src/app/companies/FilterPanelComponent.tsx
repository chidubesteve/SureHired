"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { COMPANY_SIZES, INDUSTRIES, WORK_STYLES } from "@/constants/filters";
import { LuFilter, LuX } from "react-icons/lu";

interface FilterPanelProps {
  // this is to Notifies the parent component when any filters changes

  onFiltersChange: (filters: {
    industries: string[];
    sizes: string[];
    workStyles: string[];
  }) => void;
}

const FilterPanel = ({ onFiltersChange }: FilterPanelProps) => {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedWorkStyles, setSelectedWorkStyles] = useState<string[]>([]);

  const handleIndustryChange = (industry: string, checked: boolean) => {
    const newIndustries = checked
      ? [...selectedIndustries, industry]
      : selectedIndustries.filter((i) => i !== industry);

    setSelectedIndustries(newIndustries);
    onFiltersChange({
      industries: newIndustries,
      sizes: selectedSizes,
      workStyles: selectedWorkStyles,
    });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...selectedSizes, size]
      : selectedSizes.filter((s) => s !== size);

    setSelectedSizes(newSizes);
    onFiltersChange({
      industries: selectedIndustries,
      sizes: newSizes,
      workStyles: selectedWorkStyles,
    });
  };

  const handleWorkStyleChange = (workStyle: string, checked: boolean) => {
    const newWorkStyles = checked
      ? [...selectedWorkStyles, workStyle]
      : selectedWorkStyles.filter((w) => w !== workStyle);

    setSelectedWorkStyles(newWorkStyles);
    onFiltersChange({
      industries: selectedIndustries,
      sizes: selectedSizes,
      workStyles: newWorkStyles,
    });
  };

  const clearAllFilters = () => {
    setSelectedIndustries([]);
    setSelectedSizes([]);
    setSelectedWorkStyles([]);
    onFiltersChange({
      industries: [],
      sizes: [],
      workStyles: [],
    });
  };

  const activeFiltersCount =
    selectedIndustries.length +
    selectedSizes.length +
    selectedWorkStyles.length;

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <LuFilter className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-brand-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-white mx-4" align="center">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-neutral-600 hover:text-neutral-900"
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Industry Filter */}
            <div>
              <h5 className="font-medium text-sm mb-2">Industry</h5>
              <div className="space-y-2">
                {INDUSTRIES.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={`industry-${industry}`}
                      checked={selectedIndustries.includes(industry)}
                      onCheckedChange={(checked) =>
                        handleIndustryChange(industry, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`industry-${industry}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {industry}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Size Filter */}
            <div>
              <h5 className="font-medium text-sm mb-2">Company Size</h5>
              <div className="space-y-2">
                {COMPANY_SIZES.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={(checked) =>
                        handleSizeChange(size, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`size-${size}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {size} employees
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Style Filter */}
            <div>
              <h5 className="font-medium text-sm mb-2">Work Style</h5>
              <div className="space-y-2">
                {WORK_STYLES.map((workStyle) => (
                  <div key={workStyle} className="flex items-center space-x-2">
                    <Checkbox
                      id={`workstyle-${workStyle}`}
                      checked={selectedWorkStyles.includes(workStyle)}
                      onCheckedChange={(checked) =>
                        handleWorkStyleChange(workStyle, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`workstyle-${workStyle}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {workStyle}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-neutral-600 hover:text-neutral-900"
        >
          <LuX className="w-4 h-4 mr-1" />
          Clear filters
        </Button>
      )}
    </div>
  );
};

export default FilterPanel;
