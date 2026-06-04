=== DESIGN BRIEF: Casso Career Path Visualizer ===

BRAND IDENTITY
--------------
Company: Casso (Vietnamese fintech/payment startup)
Primary color palette:
  - Leaf Green (brand primary): #2D6A4F or #40916C (xanh lá đậm, không mint, không neon)
  - Pure Black: #0D0D0D
  - Off-White / Paper White: #F5F5F0
  - Accent Mid-Green: #52B788 (hover states, highlights)
  - Muted Green-Gray: #1B4332 (dark backgrounds, sidebar)
  - Light Green tint: #D8F3DC (badge backgrounds, tag fills)
Typography:
  - Heading font: Inter or Plus Jakarta Sans (Bold/SemiBold)
  - Body font: Inter (Regular/Medium)
  - Monospace for level labels (L1–L6): JetBrains Mono or Fira Code
Logo placement: Top-left corner, white version on dark header

LAYOUT STRUCTURE — Desktop (1440px wide)
-----------------------------------------
[HEADER BAR]
  - Height: 64px
  - Background: #0D0D0D (deep black)
  - Left: Casso logo (white) + product name "Career Path Explorer"
  - Right: subtle tagline "Khám phá lộ trình thăng tiến tại Casso"
  - Bottom border: 2px solid #40916C (green accent line)

[SIDEBAR — LEFT PANEL] — Width: 280px
  - Background: #1B4332 (dark forest green)
  - Title: "Chọn Chuyên Môn" in white Bold 16px
  - Subtitle: "15 chuyên môn đang hoạt động" in #52B788 12px
  - Search input: rounded, dark background #0D0D0D, green focus border
  - Expertise list grouped by Segment tag:
      Segments: BUILD / SALE / SERVICE / MANAGE / PROFIT
      Each segment = collapsible group header (uppercase, #52B788, 11px tracking-wider)
      Items inside each group = clickable rows:
        - Icon (16px): colored dot matching segment color
        - Expertise name in white 14px
        - Group badge (e.g., "Technical", "Product") in #D8F3DC text on #2D6A4F pill
        - Selected state: full-row highlight #40916C, white text, left border 3px #52B788
  - Segment color coding:
      BUILD → #40916C (green)
      SALE → #F4A261 (warm orange, for contrast)
      SERVICE → #4CC9F0 (sky blue)
      MANAGE → #9B8EC4 (soft purple)
      PROFIT → #E9C46A (gold)

[MAIN CONTENT — RIGHT PANEL]
  - Background: #F5F5F0 (off-white)
  - Width: 1160px (fills remaining space)
  - Padding: 40px top, 48px sides

  [SECTION HEADER]
    - Breadcrumb: "Career Path > [Selected Expertise]"
    - Large title: "[Expertise Name]" Bold 32px #0D0D0D
    - Meta row: Expertise Group chip + Segment chip (colored per segment) + Flag badge (e.g., "TI5")
    - Horizontal rule: 1px #D8F3DC

  [CAREER PATH DIAGRAM AREA]
    - 5-column horizontal layout
    - Column headers (sticky at top of diagram):
        Col 1: "Đào Tạo" — Trainee
        Col 2: "Thực Tập" — Intern
        Col 3: "Ngạch Chuyên Môn" — Professional Track
        Col 4: "Ngạch Quản Lý" — Management Track
        Col 5: "Ngạch Lãnh Đạo" — Leadership Track
      Header style: pill shape, #0D0D0D background, white text 12px SemiBold, centered
      Column widths: 160px | 160px | 220px | 220px | 220px

    - Column backgrounds alternating subtle:
        Trainee + Intern: #FFFFFF with dashed border #D8F3DC
        Professional: #F0FFF4 (light green tint)
        Management: #F5F5F0
        Leadership: #E8F5E9 (slightly greener)

    - Each role card (node):
        Width: 180px, Height: auto min 56px
        Background: #FFFFFF
        Border: 1.5px solid #D8F3DC
        Border-radius: 10px
        Left accent bar: 4px solid [track color]
          Professional → #40916C
          Management → #2D6A4F
          Leadership → #1B4332
          Trainee → #A8D5B5 (light)
          Intern → #74C69D (medium)
        Shadow: 0 2px 8px rgba(0,0,0,0.06)
        Content:
          - Level badge: "L1" / "L3" etc. — monospace 10px, #52B788, top-right corner
          - Role title: 13px SemiBold #0D0D0D, max 2 lines
        Hover state:
          - Border: 1.5px solid #40916C
          - Shadow: 0 4px 16px rgba(64,145,108,0.2)
          - Background: #F0FFF4
        Selected/Active state:
          - Background: #40916C
          - Text: white
          - Shadow: 0 6px 20px rgba(64,145,108,0.35)

    - Arrows / connectors between cards:
        Straight vertical arrows within same track: solid line #40916C, arrowhead filled
        Horizontal arrows crossing tracks (Pro → Mgmt, Mgmt → Leadership):
          solid line #2D6A4F, arrowhead filled, slightly thicker (2px)
        Bidirectional arrow (Mgmt L5 ↔ Leadership L5):
          double-headed arrow, dashed line #40916C, label "↔ Có thể chuyển đổi" 
          in 10px italic pill badge
        Arrow style: smooth curves (bezier), NOT straight 90° lines
        Arrowhead: filled triangle 6px

  [LEGEND PANEL — bottom of diagram]
    - Small horizontal legend bar
    - Items: colored dot + label for each track
    - Arrow types explained: solid=thăng tiến, dashed=chuyển đổi 2 chiều
    - Background: #FFFFFF, border-radius 8px, border 1px #D8F3DC

  [EMPTY STATE — when no expertise selected]
    - Centered illustration: abstract career ladder in green line art style
    - Text: "Chọn một chuyên môn để xem lộ trình thăng tiến"
    - Subtext: "15 chuyên môn đang hoạt động tại Casso"
    - CTA button: "Khám Phá Ngay" — #40916C background, white text, rounded

INTERACTION STATES TO DESIGN
------------------------------
State 1: Default / No selection (empty state illustration)
State 2: Expertise selected — full diagram shown
State 3: Hover on a role card — tooltip showing full title + track level
State 4: Disabled expertise — grayed out in sidebar with "Chưa kích hoạt" badge

RESPONSIVE NOTE
---------------
Design for 1440px desktop as primary.
Add a 375px mobile frame as secondary where:
  - Sidebar becomes a bottom sheet / horizontal scroll chips
  - Diagram becomes a vertical timeline (top-down flow instead of left-right)

ADDITIONAL MICRO-DETAILS
-------------------------
- Top-right of main panel: "Export PDF" ghost button + "Share" icon button
- Small animated dot pulsing on the currently selected card (green pulse)
- Progress indicator: "Bạn đang ở đây" pin that HR can drop on current position
- Number indicator on each column header: "5 cấp bậc" in parentheses
- Subtle grid/dot pattern background on the diagram area (very low opacity #D8F3DC dots)

DESIGN STYLE KEYWORDS
----------------------
Clean, professional, data-forward, not corporate-boring.
Inspired by: Linear.app, Notion, Vercel dashboard.
NOT: colorful startup rainbow, heavy shadows, skeuomorphic.
Green should feel: forest/nature/growth — NOT toxic/neon/gaming.