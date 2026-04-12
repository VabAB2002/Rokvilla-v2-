/* ═══════════════════════════════════════════════
   RokVilla Build Page — Package Comparison Data
   ═══════════════════════════════════════════════ */

/* ── Types ── */

// Cell value: string = text, true = ✓, false = ✗, null = empty/dash
export type ComparisonCellValue = string | boolean | null

export type PackageTypeId = 'homes' | 'luxury-homes'

export interface PackageTier {
  readonly id: string
  readonly name: string
  readonly pricePerSqft: number
}

export interface ComparisonRow {
  readonly id: string
  readonly icon: string // lucide-react icon name
  readonly feature: string
  readonly subtitle?: string
  readonly values: ReadonlyArray<ComparisonCellValue>
}

export interface ComparisonCategory {
  readonly id: string
  readonly name: string
  readonly subtitle?: string
  readonly footnote?: string
  readonly rows: ReadonlyArray<ComparisonRow>
}

export interface PackageType {
  readonly id: PackageTypeId
  readonly label: string
  readonly startingPrice: number
  readonly tiers: ReadonlyArray<PackageTier>
  readonly categories: ReadonlyArray<ComparisonCategory>
}

/* ── Package Types ── */

export const PACKAGE_TYPES: ReadonlyArray<PackageType> = [
  /* ════════════════════════════════════════════════
     HOMES — 4 tiers, 8 categories
     ════════════════════════════════════════════════ */
  {
    id: 'homes',
    label: 'Homes/Buildings',
    startingPrice: 1910,
    tiers: [
      { id: 'basic', name: 'Basic', pricePerSqft: 1910 },
      { id: 'classic', name: 'Classic', pricePerSqft: 2040 },
      { id: 'premium', name: 'Premium', pricePerSqft: 2360 },
      { id: 'royale', name: 'Royale', pricePerSqft: 2595 },
    ],
    categories: [
      /* ── STRUCTURE ── */
      {
        id: 'h-structure',
        name: 'Structure',
        rows: [
          {
            id: 'h-rcc-mix',
            icon: 'FlaskConical',
            feature: 'RCC Mix',
            values: [true, true, 'ACC or Ultratech', 'ACC or Ultratech'],
          },
          {
            id: 'h-steel',
            icon: 'Hammer',
            feature: 'Steel',
            subtitle: '500 TMT Bars',
            values: [
              'Sunvik / Prime gold / Kamdhenu / Tirumala',
              'Indus / Jindal Panther / Vizag',
              'Indus / Jindal Panther / Vizag',
              'Indus / Jindal Panther / Vizag',
            ],
          },
          {
            id: 'h-cement',
            icon: 'Box',
            feature: 'Cement',
            subtitle: '43 Grade or 53 as Needed',
            values: [
              'Zuari / Dalmia / Bharathi',
              'Zuari / Dalmia / Bharathi',
              'ACC / Ultratech / Ramco Supercrete',
              'ACC / Ultratech / Ramco Supercrete',
            ],
          },
          {
            id: 'h-aggregates',
            icon: 'Mountain',
            feature: 'Aggregates',
            values: [true, true, true, true],
          },
          {
            id: 'h-walls',
            icon: 'Layers',
            feature: 'Walls',
            values: [
              'Solid concrete blocks 6" outer 4" inner',
              'Solid concrete blocks 8" outer 4" inner',
              'Red bricks Wall of \u2013 9" (outer Walls) & 4.5" (Inner Wall)',
              'Red bricks Wall of \u2013 9" (outer Walls) & 4.5" (Inner Wall)',
            ],
          },
          {
            id: 'h-ceiling-height',
            icon: 'MoveVertical',
            feature: 'Ceiling height',
            values: ["10'", "10'", "10'-6\"", "11'"],
          },
          {
            id: 'h-sill-lintel',
            icon: 'Ruler',
            feature: 'Sill and Lintel Height',
            values: [
              "Sill Height - 3', Lintel Height - 7'",
              "Sill Height - 3', Lintel Height - 7'",
              "Sill Height - 3', Lintel Height - 7'",
              "Sill Height - 2', Lintel Height - 7'",
            ],
          },
          {
            id: 'h-anti-termite',
            icon: 'Bug',
            feature: 'Anti Termite Treatment',
            values: [false, true, true, true],
          },
          {
            id: 'h-loft',
            icon: 'ArrowUp',
            feature: 'Loft above Bathroom',
            values: [false, false, true, true],
          },
        ],
      },

      /* ── KITCHEN ── */
      {
        id: 'h-kitchen',
        name: 'Kitchen',
        subtitle: 'All fittings can be customised at cost',
        rows: [
          {
            id: 'h-kitchen-dado',
            icon: 'LayoutGrid',
            feature: 'Vitrified Wall Dado',
            values: [
              'Upto \u20B940 per sqft',
              'Upto \u20B940 per sqft',
              'Upto \u20B960 per sqft',
              'Upto \u20B980 per sqft',
            ],
          },
          {
            id: 'h-kitchen-sink',
            icon: 'Droplets',
            feature: 'Sink',
            values: [
              'Upto \u20B93,000 (Single bowl SS)',
              'Upto \u20B94,000 (Single bowl SS)',
              'Upto \u20B94,000 (Single bowl SS)',
              'Upto \u20B96,000 (Single bowl SS)',
            ],
          },
          {
            id: 'h-kitchen-faucet',
            icon: 'Pipette',
            feature: 'Sink Faucet',
            values: [
              'Upto \u20B91,500',
              'Upto \u20B92,000',
              'Upto \u20B92,500',
              'Upto \u20B93,000',
            ],
          },
          {
            id: 'h-kitchen-accessories',
            icon: 'Wrench',
            feature: 'Sink Accessories',
            values: [
              'ISI Marked',
              'ISI Marked',
              'Parryware / Hindware / Jal',
              'Parryware / Hindware / Jal',
            ],
          },
        ],
      },

      /* ── BATHROOM ── */
      {
        id: 'h-bathroom',
        name: 'Bathroom',
        subtitle: 'All fittings can be customised at cost',
        rows: [
          {
            id: 'h-bath-dado',
            icon: 'LayoutGrid',
            feature: 'Vitrified Wall Cladding',
            values: [
              'Upto \u20B940 per sqft',
              'Upto \u20B940 per sqft',
              'Upto \u20B960 per sqft',
              'Upto \u20B980 per sqft',
            ],
          },
          {
            id: 'h-bath-sanitary',
            icon: 'Wrench',
            feature: 'Sanitary & CP Fittings',
            values: [
              'Upto \u20B915,000 per bathroom',
              'Upto \u20B920,000 per bathroom',
              'Upto \u20B925,000 per bathroom (Parryware / Hindware / Jal)',
              'Upto \u20B930,000 per bathroom (Parryware / Hindware / Jal)',
            ],
          },
          {
            id: 'h-bath-cpvc',
            icon: 'Pipette',
            feature: 'CPVC Pipe',
            values: [true, true, true, true],
          },
          {
            id: 'h-bath-ewc',
            icon: 'Bath',
            feature: 'EWC',
            values: [
              'ISI Marked',
              'ISI Marked',
              'Parryware / Hindware / Jal',
              'Parryware / Hindware / Jal',
            ],
          },
          {
            id: 'h-bath-basin',
            icon: 'Droplets',
            feature: 'Wash Basin',
            values: [
              'ISI Marked',
              'ISI Marked',
              'Parryware / Hindware / Jal',
              'Parryware / Hindware / Jal',
            ],
          },
          {
            id: 'h-bath-accessories',
            icon: 'Settings',
            feature: 'Bathroom Accessories',
            values: [
              'ISI Marked',
              'ISI Marked',
              'Parryware / Hindware / Jal',
              'Parryware / Hindware / Jal',
            ],
          },
        ],
      },

      /* ── DOORS & WINDOWS ── */
      {
        id: 'h-doors-windows',
        name: 'Doors & Windows',
        rows: [
          {
            id: 'h-main-door',
            icon: 'DoorOpen',
            feature: 'Main Door',
            values: [
              'Flush door with veneer upto \u20B915,000 including hardware',
              'Teak door & Teak frame upto \u20B925,000 including hardware',
              'Teak door & Teak frame upto \u20B925,000 including hardware',
              'Teak door & Teak frame upto \u20B925,000 including hardware',
            ],
          },
          {
            id: 'h-internal-doors',
            icon: 'DoorClosed',
            feature: 'Internal Doors',
            values: [
              'Membrane / Flush door upto \u20B94,000',
              'Membrane / Flush door upto \u20B95,000',
              'Membrane / Flush door upto \u20B97,000',
              'Flush door upto \u20B98,000',
            ],
          },
          {
            id: 'h-bathroom-doors',
            icon: 'DoorOpen',
            feature: 'Bathroom Doors',
            values: [
              'Flush door upto \u20B92,500',
              'Flush door upto \u20B93,500',
              'Flush door upto \u20B93,500',
              'Flush door upto \u20B95,000',
            ],
          },
          {
            id: 'h-windows',
            icon: 'AppWindow',
            feature: 'Windows',
            values: [
              'UPVC windows with 2.5 track & mesh shutter',
              'UPVC windows with 2.5 track & mesh shutter',
              'UPVC windows with 3 track & mesh shutter',
              'UPVC windows with 3 track & mesh shutter',
            ],
          },
          {
            id: 'h-window-grills',
            icon: 'Grid3x3',
            feature: 'Window Grills',
            values: [
              'MS Grill upto \u20B980 per sqft',
              'MS Grill upto \u20B990 per sqft',
              'MS Grill upto \u20B9100 per sqft',
              'MS Grill upto \u20B9120 per sqft',
            ],
          },
        ],
      },

      /* ── PAINTING ── */
      {
        id: 'h-painting',
        name: 'Painting',
        rows: [
          {
            id: 'h-interior-painting',
            icon: 'Paintbrush',
            feature: 'Interior Painting',
            subtitle: '2 Coat Putty + 1 Primer + 2 Coat Paint (Asian Paint / Nerolac)',
            values: [
              'Tractor Emulsion or equivalent',
              'Tractor Shyne Emulsion or equivalent',
              'Apcolite Premium or equivalent',
              'Royale Luxury Emulsion or equivalent',
            ],
          },
          {
            id: 'h-exterior-painting',
            icon: 'PaintBucket',
            feature: 'Exterior Painting',
            subtitle: '1 Primer + 2 Coat Paint (Asian Paint / Nerolac)',
            values: [
              'Ace Exterior Emulsion or equivalent',
              'Apex Exterior Emulsion or equivalent',
              'Apex Exterior Emulsion or equivalent',
              'Apex Ultima Exterior Emulsion or equivalent',
            ],
          },
        ],
      },

      /* ── FLOORING ── */
      {
        id: 'h-flooring',
        name: 'Flooring',
        subtitle: 'Laying charges will vary for marble, tiles and granite',
        rows: [
          {
            id: 'h-floor-living',
            icon: 'Sofa',
            feature: 'Living & Dining Flooring',
            values: [
              'Vitrified Tiles upto \u20B950 per sqft',
              'Vitrified Tiles upto \u20B960 per sqft',
              'Vitrified Tiles / Granite upto \u20B990 per sqft',
              'Vitrified Tiles / Granite upto \u20B9110 per sqft',
            ],
          },
          {
            id: 'h-floor-rooms',
            icon: 'BedDouble',
            feature: 'Rooms and Kitchen Flooring',
            values: [
              'Vitrified Tiles upto \u20B950 per sqft',
              'Vitrified Tiles upto \u20B960 per sqft',
              'Vitrified Tiles upto \u20B960 per sqft',
              'Vitrified Tiles / Granite upto \u20B9110 per sqft',
            ],
          },
          {
            id: 'h-floor-balcony',
            icon: 'Sun',
            feature: 'Balcony and Open Areas',
            values: [
              'Vitrified Tiles upto \u20B940 per sqft',
              'Vitrified Tiles upto \u20B960 per sqft',
              'Vitrified Tiles upto \u20B960 per sqft',
              'Vitrified Tiles / Granite upto \u20B9110 per sqft',
            ],
          },
          {
            id: 'h-floor-staircase',
            icon: 'ArrowUpRight',
            feature: 'Staircase Flooring',
            values: [
              'Vitrified Tiles upto \u20B950 per sqft',
              'Vitrified Tiles upto \u20B960 per sqft',
              'Vitrified Tiles / Granite upto \u20B990 per sqft',
              'Vitrified Tiles / Granite upto \u20B9110 per sqft',
            ],
          },
          {
            id: 'h-floor-parking',
            icon: 'Car',
            feature: 'Parking',
            values: [
              'Vitrified Tiles upto \u20B940 per sqft',
              'Vitrified Tiles upto \u20B960 per sqft',
              'Vitrified Tiles upto \u20B960 per sqft',
              'Vitrified Tiles upto \u20B970 per sqft',
            ],
          },
        ],
      },

      /* ── WIRING ── */
      {
        id: 'h-wiring',
        name: 'Wiring',
        rows: [
          {
            id: 'h-wiring-fire',
            icon: 'Cable',
            feature: 'Fireproof Wiring',
            values: [
              'Finolex Silver FR or equivalent',
              'Finolex / Anchor / Havells',
              'Finolex / Anchor / Havells',
              'Finolex / Anchor / Havells',
            ],
          },
          {
            id: 'h-wiring-switch',
            icon: 'ToggleRight',
            feature: 'Switch',
            values: [
              'GM / Great White',
              'Roma / Uma / Havells Fabio',
              'Havells Coral / Roma',
              'Havells Coral / Roma',
            ],
          },
          {
            id: 'h-wiring-socket',
            icon: 'Plug',
            feature: 'Socket',
            values: [
              'GM / Great White',
              'Roma / Uma / Havells Fabio',
              'Havells Coral / Roma',
              'Havells Coral / Roma',
            ],
          },
          {
            id: 'h-wiring-ups',
            icon: 'BatteryCharging',
            feature: 'Provision for UPS Wiring',
            subtitle: 'Ground Floor',
            values: [true, true, true, true],
          },
          {
            id: 'h-wiring-ev',
            icon: 'PlugZap',
            feature: 'EV Charging Point',
            values: [false, false, true, true],
          },
        ],
      },

      /* ── OTHERS ── */
      {
        id: 'h-others',
        name: 'Others',
        rows: [
          {
            id: 'h-overhead-tank',
            icon: 'Container',
            feature: 'Overhead Tank',
            subtitle: 'Double layered tank of Apollo / equivalent make',
            values: [
              '1000 Ltrs. of Apollo / equivalent make',
              '1500 Ltrs. of Apollo / equivalent make',
              '2000 Ltrs. of Sintex / equivalent make',
              '2000 Ltrs. of Sintex / equivalent make',
            ],
          },
          {
            id: 'h-underground-sump',
            icon: 'Waves',
            feature: 'Underground Sump',
            values: ['4,000 Ltrs.', '6,000 Ltrs.', '7,000 Ltrs.', '8,000 Ltrs.'],
          },
          {
            id: 'h-staircase-railing',
            icon: 'Fence',
            feature: 'Staircase Railing',
            values: [
              'MS Railing',
              'MS Railing',
              'SS 304 grade Railing',
              'SS 304 grade Railing',
            ],
          },
          {
            id: 'h-gas-connection',
            icon: 'Flame',
            feature: 'Copper Gas Connection',
            values: [
              false,
              false,
              false,
              '1 no. per dwelling unit of 1500 sqft of package area',
            ],
          },
        ],
      },
    ],
  },

  /* ════════════════════════════════════════════════
     LUXURY HOMES — 3 tiers, 13 categories
     ════════════════════════════════════════════════ */
  {
    id: 'luxury-homes',
    label: 'Luxury Homes/Luxury Buildings',
    startingPrice: 3910,
    tiers: [
      { id: 'freesia', name: 'Luxe', pricePerSqft: 3910 },
      { id: 'dahlia', name: 'Elite', pricePerSqft: 5080 },
      { id: 'magnolia', name: 'Signature', pricePerSqft: 6220 },
    ],
    categories: [
      /* ── STRUCTURE ── */
      {
        id: 'structure',
        name: 'Structure',
        footnote: '*RCC design mix as advised by the structural engineer',
        rows: [
          {
            id: 'earthquake-resistant',
            icon: 'ShieldCheck',
            feature: 'Earthquake Resistant Design',
            values: [true, true, true],
          },
          {
            id: 'steel',
            icon: 'Hammer',
            feature: 'Steel',
            subtitle: 'Fe 550',
            values: [
              'JSW Neosteel / SAIL / Vizag',
              'JSW Neosteel / SAIL / Vizag',
              'JSW Neosteel / SAIL / Vizag',
            ],
          },
          {
            id: 'cement',
            icon: 'Box',
            feature: 'Cement',
            subtitle: '43 grade in surface, 53 grade in core',
            values: [
              'ACC / Ultratech / Ramco Supercrete',
              'ACC / Ultratech / Ramco Supercrete',
              'ACC / Ultratech / Ramco Supercrete',
            ],
          },
          {
            id: 'aggregates',
            icon: 'Mountain',
            feature: 'Aggregates',
            subtitle: '20 mm, 40 mm',
            values: [true, true, true],
          },
          {
            id: 'concrete-block',
            icon: 'Layers',
            feature: 'Solid Concrete Block Work',
            subtitle: '6 inch (outer), 4 inch (inner)',
            values: [true, true, true],
          },
          {
            id: 'rcc-mix',
            icon: 'FlaskConical',
            feature: 'RCC Mix',
            subtitle: 'M25 or as per structural designer recommendation',
            values: [true, true, true],
          },
          {
            id: 'ceiling-height',
            icon: 'MoveVertical',
            feature: 'Ceiling Height',
            subtitle: 'Floor-to-Floor height 12ft',
            values: [true, true, true],
          },
          {
            id: 'anti-termite',
            icon: 'Bug',
            feature: 'Anti Termite Treatment',
            values: [true, true, true],
          },
        ],
      },

      /* ── KITCHEN ── */
      {
        id: 'kitchen',
        name: 'Kitchen',
        subtitle: 'All fittings can be customised at cost',
        rows: [
          {
            id: 'kitchen-wall-dado',
            icon: 'LayoutGrid',
            feature: 'Wall Dado',
            values: [
              'Indian / Italian Marble upto \u20B9380 per sqft',
              'Indian / Italian Marble upto \u20B9380 per sqft',
              'Indian / Italian Marble upto \u20B9380 per sqft',
            ],
          },
          {
            id: 'kitchen-sink',
            icon: 'Droplets',
            feature: 'Sink',
            values: [
              'Kaff / Franke upto \u20B910,000',
              'Kaff / Franke upto \u20B912,000',
              'Kaff / Franke upto \u20B915,000',
            ],
          },
          {
            id: 'kitchen-faucet',
            icon: 'Pipette',
            feature: 'Sink Faucet',
            values: [
              'Grohe / Kohler upto \u20B95,000',
              'Grohe / Roca / Kohler upto \u20B96,000',
              'Grohe / Roca / Kohler upto \u20B910,000',
            ],
          },
        ],
      },

      /* ── BATHROOM ── */
      {
        id: 'bathroom',
        name: 'Bathroom',
        subtitle: 'All fittings can be customised at cost',
        rows: [
          {
            id: 'bath-wall-dado',
            icon: 'LayoutGrid',
            feature: 'Wall Dado',
            values: [
              'Italian Marble upto \u20B9380 per sqft',
              'Italian Marble upto \u20B9450 per sqft',
              'Italian Marble upto \u20B9500 per sqft',
            ],
          },
          {
            id: 'bath-cp-fittings',
            icon: 'Wrench',
            feature: 'CP Fittings',
            values: [
              'Grohe / Kohler upto \u20B95L for 3 bathrooms',
              'Grohe / Kohler upto \u20B97L for 3 bathrooms',
              'Grohe / Kohler / American Standard upto \u20B910L for 3 bathrooms',
            ],
          },
          {
            id: 'bath-sanitaryware',
            icon: 'Bath',
            feature: 'Sanitaryware',
            values: [
              'Grohe / Kohler upto \u20B92.5L for 3 bathrooms',
              'Grohe / Kohler / American Standard upto \u20B93.5L for 3 bathrooms',
              'Grohe / Kohler / American Standard upto \u20B94.5L for 3 bathrooms / includes Jacuzzi in Master Bathroom',
            ],
          },
          {
            id: 'bath-heat-pump',
            icon: 'Zap',
            feature: 'Centralized Energy',
            subtitle: 'Saving Heat Pump upto \u20B93L',
            values: [true, true, true],
          },
          {
            id: 'bath-false-ceiling',
            icon: 'PanelTop',
            feature: 'False Ceiling',
            subtitle: 'Moisture resistant / Grid',
            values: [true, true, true],
          },
          {
            id: 'bath-glass-partition',
            icon: 'Columns2',
            feature: 'Glass Partition',
            values: ['Master Bathroom', 'Master & Kids Bathroom', 'All Bathrooms'],
          },
          {
            id: 'bath-motion-sensor',
            icon: 'Lightbulb',
            feature: 'Motion Sensor Lighting',
            values: [true, true, true],
          },
        ],
      },

      /* ── DOORS & WINDOWS ── */
      {
        id: 'doors-windows',
        name: 'Doors & Windows',
        rows: [
          {
            id: 'windows',
            icon: 'AppWindow',
            feature: 'Windows',
            values: [
              'High Precision Double Glazed Sound & Weather Proof UPVC / Wooden Windows with Mesh Shutters (Eiti or equivalent)',
              'High Precision Double Glazed Sound & Weather Proof UPVC / Wooden Windows with Mesh Shutters (Eiti or equivalent)',
              'High Precision Double Glazed Sound & Weather Proof UPVC / Wooden Windows with Mesh Shutters (Eiti or equivalent)',
            ],
          },
          {
            id: 'main-door',
            icon: 'DoorOpen',
            feature: 'Main Door',
            values: [
              'Engineered Wood Imported Burma Teak upto \u20B980,000',
              'Engineered Wood Imported Burma Teak upto \u20B91,20,000',
              'Engineered Wood Imported Burma Teak upto \u20B91,50,000',
            ],
          },
          {
            id: 'internal-doors',
            icon: 'DoorClosed',
            feature: 'Internal Doors',
            values: [
              'Membrane / Flush Door with Veneer upto \u20B925,000',
              'Membrane / Flush Door with Veneer upto \u20B930,000',
              'Membrane / Flush Door with Veneer upto \u20B935,000',
            ],
          },
          {
            id: 'door-frames',
            icon: 'Frame',
            feature: 'Door Frames',
            values: [
              'Imported Ghana Teak Jamb Lining',
              'Imported Border Teak Jamb Lining',
              'Burma Teak Jamb Lining',
            ],
          },
          {
            id: 'bathroom-doors',
            icon: 'DoorOpen',
            feature: 'Bathroom Doors',
            values: [
              'Louvered Teak Wood upto \u20B920,000',
              'Louvered Teak Wood upto \u20B925,000',
              'Louvered Teak Wood upto \u20B930,000',
            ],
          },
          {
            id: 'puja-room-door',
            icon: 'Sparkles',
            feature: 'Puja Room Door',
            values: [
              'Burma Teak + Teak Frame upto \u20B940,000',
              'Burma Teak + Teak Frame upto \u20B950,000',
              'Burma Teak + Teak Frame upto \u20B960,000',
            ],
          },
        ],
      },

      /* ── PAINTING ── */
      {
        id: 'painting',
        name: 'Painting',
        rows: [
          {
            id: 'interior-painting',
            icon: 'Paintbrush',
            feature: 'Interior Painting',
            values: [
              'JK Putty / Asian Royale Emulsion or equivalent',
              'JK Putty / Asian Royale Luxury Emulsion or equivalent',
              'JK Putty / Asian Royale Shyne Luxury Emulsion or equivalent',
            ],
          },
          {
            id: 'exterior-painting',
            icon: 'PaintBucket',
            feature: 'Exterior Painting',
            values: [
              'Asian Primer / Apex Ultima Protek Paint or equivalent',
              'Asian Primer / Apex Ultima Protek Duralife Paint or equivalent',
              'Asian Primer / Apex Ultima Protek Lamino Paint or equivalent',
            ],
          },
        ],
      },

      /* ── FLOORING ── */
      {
        id: 'flooring',
        name: 'Flooring',
        subtitle: 'Laying charges will vary for marble, tiles and granite',
        rows: [
          {
            id: 'floor-living',
            icon: 'Sofa',
            feature: 'Living, Dining, Other Bedrooms, Kitchen',
            values: [
              'Marble upto \u20B9380 per sqft',
              'Marble upto \u20B9450 per sqft',
              'Marble upto \u20B9500 per sqft',
            ],
          },
          {
            id: 'floor-master-bedroom',
            icon: 'BedDouble',
            feature: 'Master Bedroom & Kids Bedroom',
            subtitle: 'American Oak Wooden flooring upto \u20B9900/sqft',
            values: [null, true, true],
          },
          {
            id: 'floor-bathroom',
            icon: 'Footprints',
            feature: 'Bathroom Flooring',
            subtitle: 'Antiskid',
            values: [
              'Tiles / Marble upto \u20B9380 per sqft',
              'Tiles / Marble upto \u20B9450 per sqft',
              'Tiles / Marble upto \u20B9500 per sqft',
            ],
          },
          {
            id: 'floor-balcony',
            icon: 'Sun',
            feature: 'Balcony & Open Areas',
            subtitle: 'Antiskid',
            values: [
              'Tiles upto \u20B9120/sqft',
              'Tiles upto \u20B9150/sqft',
              'Tiles upto \u20B9200/sqft',
            ],
          },
          {
            id: 'floor-staircase',
            icon: 'ArrowUpRight',
            feature: 'Staircase Flooring',
            values: [
              'Marble upto \u20B9380 per sqft',
              'Marble upto \u20B9450 per sqft',
              'Marble upto \u20B9500 per sqft',
            ],
          },
          {
            id: 'floor-parking',
            icon: 'Car',
            feature: 'Parking Tiles',
            values: [
              'Stamp Concrete Finish / Natural Stones upto \u20B9100/sqft',
              'Stamp Concrete Finish / Natural Stones upto \u20B9120/sqft',
              'Stamp Concrete Finish / Natural Stones upto \u20B9150/sqft',
            ],
          },
        ],
      },

      /* ── ELECTRICAL ── */
      {
        id: 'electrical',
        name: 'Electrical',
        rows: [
          {
            id: 'wiring',
            icon: 'Cable',
            feature: 'Wiring',
            values: [
              'Fireproof Wires (Finolex Silver FR or equivalent)',
              'Fireproof Wires (Finolex Silver FR or equivalent)',
              'Fireproof Wires (Finolex Silver FR or equivalent)',
            ],
          },
          {
            id: 'switches-sockets',
            icon: 'ToggleRight',
            feature: 'Switches & Sockets',
            values: [
              'Legrand Myrius / Schneider Zencelo / GM equivalent',
              'Legrand Myrius / Schneider Zencelo / GM equivalent',
              'Legrand Myrius / Schneider Zencelo / GM equivalent',
            ],
          },
          {
            id: 'ups-wiring',
            icon: 'BatteryCharging',
            feature: 'UPS Wiring',
            values: [true, true, true],
          },
          {
            id: 'ev-charging',
            icon: 'PlugZap',
            feature: 'EV Charging Point',
            values: [true, true, true],
          },
        ],
      },

      /* ── WATER STORAGE ── */
      {
        id: 'water-storage',
        name: 'Water Storage',
        rows: [
          {
            id: 'overhead-tank',
            icon: 'Container',
            feature: 'Overhead Tank',
            subtitle: 'Triple layered Plastic / RCC Tank',
            values: [
              '2500 Ltrs. of Sintex / equivalent make',
              '2500 Ltrs. of Sintex / equivalent make',
              '2500 Ltrs. RCC Tank',
            ],
          },
          {
            id: 'underground-sump',
            icon: 'Waves',
            feature: 'Underground Sump',
            values: ['10,000 Ltrs.', '11,000 Ltrs.', '12,000 Ltrs.'],
          },
        ],
      },

      /* ── RAILINGS & GRILLS ── */
      {
        id: 'railings-grills',
        name: 'Railings & Grills',
        rows: [
          {
            id: 'staircase-railing',
            icon: 'Fence',
            feature: 'Staircase Railing',
            values: [
              'SS 304 Railing with glass / MS Railing with Wooden Hand Rail',
              'SS 304 Railing with glass / MS Railing with Wooden Hand Rail',
              'SS 304 Railing with glass / MS Railing with Wooden Hand Rail',
            ],
          },
          {
            id: 'window-grills',
            icon: 'Grid3x3',
            feature: 'Window Grills',
            subtitle: 'Basic MS Grill finished with enamel paint',
            values: [
              'Upto \u20B9200 per sqft',
              'Upto \u20B9250 per sqft',
              'Upto \u20B9300 per sqft',
            ],
          },
        ],
      },

      /* ── GAS CONNECTION ── */
      {
        id: 'gas-connection',
        name: 'Gas Connection',
        rows: [
          {
            id: 'copper-gas',
            icon: 'Flame',
            feature: 'Copper Gas Connection',
            subtitle: '1 no. per dwelling unit of 1500 sqft of package area',
            values: [true, true, true],
          },
        ],
      },

      /* ── AIR CONDITIONING ── */
      {
        id: 'air-conditioning',
        name: 'Air Conditioning',
        rows: [
          {
            id: 'centralized-ac',
            icon: 'AirVent',
            feature: 'Centralized All Weather AC',
            values: [
              false,
              'Mitsubishi / Carrier / Daikin / equivalent make',
              'Mitsubishi / Carrier / Daikin / equivalent make',
            ],
          },
          {
            id: 'private-pool',
            icon: 'Droplets',
            feature: 'Private Pool',
            values: [false, false, 'Temperature-Controlled Lap Pool'],
          },
        ],
      },

      /* ── ELEVATOR ── */
      {
        id: 'elevator',
        name: 'Elevator',
        rows: [
          {
            id: 'elevator-unit',
            icon: 'ArrowUpDown',
            feature: 'Elevator of Mitsubishi / Schindler Make',
            values: [
              false,
              'Worth upto \u20B98 lakhs',
              'Worth upto \u20B910 lakhs with Private glass see through',
            ],
          },
        ],
      },

      /* ── HOME AUTOMATION & LUXURY INDULGENCES ── */
      {
        id: 'home-automation',
        name: 'Home Automation & Security',
        subtitle: 'Luxury Indulgences for Globetrotter Including Safety & Security',
        rows: [
          {
            id: 'home-auto-value',
            icon: 'Smartphone',
            feature: 'Home Automation',
            values: [
              'Worth upto \u20B95 lakhs',
              'Worth upto \u20B97 lakhs',
              'Worth upto \u20B910 lakhs',
            ],
          },
          {
            id: 'motion-sensor',
            icon: 'ScanEye',
            feature: 'Motion Sensor',
            values: [true, true, true],
          },
          {
            id: 'appliance-control',
            icon: 'Settings',
            feature: 'Appliance Control',
            subtitle: 'AC, Kitchen, Curtains, Mood Lighting',
            values: [true, true, true],
          },
          {
            id: 'cctv',
            icon: 'Camera',
            feature: 'CCTV Cameras across all vantage points',
            values: [false, true, true],
          },
          {
            id: 'false-ceiling-luxury',
            icon: 'PanelTop',
            feature: 'False Ceiling with recessed coves & cornices',
            values: [false, true, true],
          },
          {
            id: 'fire-panic',
            icon: 'ShieldAlert',
            feature: 'Fire alarms and Panic buttons in strategic areas',
            values: [false, true, true],
          },
          {
            id: 'parking-gate',
            icon: 'ParkingCircle',
            feature: 'Gate for car parking area',
            values: [false, true, true],
          },
          {
            id: 'intrusion-alert',
            icon: 'Bell',
            feature: 'Intrusion alert for automation system',
            values: [false, true, true],
          },
          {
            id: 'biometric-security',
            icon: 'Fingerprint',
            feature: 'Safety and security biometric and app based keyless entry and exit',
            values: [false, true, true],
          },
          {
            id: 'video-door-phone',
            icon: 'MonitorSmartphone',
            feature: 'Video door phone with extension to Kitchen, Living / Dining and Master bedroom',
            values: [false, true, true],
          },
        ],
      },
    ],
  },
] as const
