/**
 * PAY TO WIN — CENTRALIZED WEBSITE CONFIGURATION (gameData.js)
 * Aligned with Official Documentation v2.0.60 (https://kjbgranddev.github.io/PayToWin_Documentation/)
 *
 * Edit any field below to update text, stats, links, or placeholder values across the website.
 */

window.GAME_DATA = {
  meta: {
    title: "Pay to Win",
    studioName: "KLXJ Studios",
    shortCode: "P2W",
    version: "v2.0.60",
    engine: "Unity 2022.3.62f3 LTS (URP 14.0.12)",
    genre: "3rd-Person Horde Survival",
    platform: "Windows PC (x86_64)",
    targetPlayers: "Ages 16+ (Wave Survival Shooter Fans)",
    docsUrl: "https://kjbgranddev.github.io/PayToWin_Documentation/",
    githubUrl: "https://github.com/KJBGrandDev/PayToWin_Documentation",
    downloadUrl: "download.html",
    installerFileName: "PayToWin_Setup_v2.0.60.exe",
    fileSizePlaceholder: "[TBD GB — Standalone Windows Build]",
    trailerFile: "assets/PayToWin_Official_Trailer.mp4",
    trailerPoster: "assets/shot_combat_m4a1.png",
    trailerSpecs: "1920×1080 • 60 FPS • H.264 / AAC • 00:38",
    storyVideoFile: "assets/PayToWin_Story_Complete_Subtitled.mp4",
    storyVideoPoster: "assets/poster-story-complete.jpg",
    storyVideoSubtitlesVtt: "assets/PayToWin_Story_Complete_Subtitled.vtt",
    storyVideoSubtitlesSrt: "assets/PayToWin_Story_Complete_Subtitled.srt",
    storyVideoSpecs: "1920×1070 • 30 FPS • H.264 / AAC • 00:53 • Burned-in Subtitles"
  },

  /**
   * RELEASE & DOWNLOAD PORTAL CONFIGURATION
   * Powers download.html and the synced #install banner on index.html.
   * Switch `packageType` between "exe" (single installer) and "zip" (portable Unity bundle),
   * and flip `status` to "available" once the artifact is uploaded to GitHub Releases.
   */
  release: {
    status: "preparing", // "preparing" | "available" | "maintenance"
    statusLabel: "Build Export in Progress",
    statusMessage: "Our development team is finalizing and packaging the Windows PC (x86_64) build from Unity 2022.3.62f3 LTS. The direct download link will go live here as soon as export and QA verification finish.",
    packageType: "exe", // "exe" | "zip"
    version: "v2.0.60",
    buildChannel: "Milestone Release",
    releaseDate: "Pending Export",
    platform: "Windows 10 / 11 (64-bit x86_64)",
    engine: "Unity 2022.3.62f3 LTS (URP 14.0.12)",
    fileName: "PayToWin_Setup_v2.0.60.exe",
    executableName: "PayToWin.exe",
    fileSize: "TBD (Pending Unity Export)",
    sha256: "PENDING_EXPORT_RUN_PREPARE_RELEASE_SCRIPT",
    // Example GitHub Releases direct asset URL:
    // "https://github.com/<OWNER>/<REPO>/releases/download/v2.0.60/PayToWin_Setup_v2.0.60.exe"
    downloadUrl: "",
    releasesPageUrl: "https://github.com/KJBGrandDev/PayToWin_Documentation/releases",
    checksumFileUrl: "",
    packageNotes: {
      exe: {
        formatBadge: "Windows Installer (.exe)",
        ctaLabel: "Download Windows Installer (.exe)",
        installSteps: [
          {
            title: "Download Official Windows Installer",
            body: "Download {fileName} ({version}) from GitHub Releases using the primary download button above."
          },
          {
            title: "Verify Integrity & Run Setup",
            body: "Optionally verify the SHA-256 checksum, then run {fileName} (click \"More info → Run anyway\" if Windows SmartScreen prompts for an unsigned indie installer)."
          },
          {
            title: "Launch {executableName} & Enter the Arena",
            body: "Launch {executableName} from your Start Menu or installation folder. Press F9 in Build {version} to toggle all-weapons showcase mode."
          }
        ]
      },
      zip: {
        formatBadge: "Portable Archive (.zip)",
        ctaLabel: "Download Portable Archive (.zip)",
        installSteps: [
          {
            title: "Download Portable Build Archive",
            body: "Download {fileName} ({version}) from GitHub Releases using the primary download button above."
          },
          {
            title: "Extract Complete Folder Together",
            body: "Right-click and extract the full .zip into a standard user folder (such as C:\\Games\\PayToWin\\), keeping {executableName}, UnityPlayer.dll, and the _Data folder together."
          },
          {
            title: "Launch {executableName} & Enter the Arena",
            body: "Double-click {executableName} inside the extracted folder. Press F9 in Build {version} to toggle all-weapons showcase mode."
          }
        ]
      }
    },
    changelog: [
      {
        version: "v2.0.60",
        tag: "Milestone Release",
        date: "Pending Export",
        highlights: [
          "Complete 7-day escalating horde loop across Days 1–7 with Day 6 Goliath Brute and Day 7 Dual-Boss climax.",
          "Salvage Armory ([B]) featuring 6 weapons, 5-tier gunsmith part upgrades with Pine-Emerald affordability cues, Field Stims, and 500-pt Armor Rig.",
          "M4A1 upgraded to 60/300 starting reserve ammo and Tactical 9mm unlimited reserve magazines.",
          "Enlarged minimap with night-vision directional cone, 360° Holographic Combat Zone boundary alerts, and QA hotkeys (F9–F11)."
        ]
      }
    ]
  },

  narrative: {
    tagline: "A 7-day post-apocalyptic third-person survival horde shooter where sacred relics, tactical gunsmithing, and salvage economics decide whether the human retinue survives until dawn.",
    premiseTitle: "The Agonizing Choice: Televised Bloodsport vs. ICU Life Support",
    premiseBody: "Your family is dying in the ICU. Your only way to pay their medical bills is to survive a televised zombie bloodsport. Every kill earns credits, and every 30-second intermission forces an agonizing choice: spend your earnings on weapons to make the arena easier, or save it to keep your family breathing.",
    premiseHook: "In Pay to Win, every upgrade pushes your loved ones closer to the grave. How much of their life are you willing to spend to save your own?",
    worldStory1: "After the original biblical stone tablets are uncovered, the Pope grasps the artifact—binding Satan’s shackles as firmly as when God first cast him down. In retaliation, Hell descends upon the mortal world, unleashing an unholy plague that turns mankind into demonic zombies.",
    worldStory2: "Conventional survival supplies (food, water, and trauma kits) can be scavenged from ruined settlements, but blessed bullets and sacred wards can only be replenished through liturgical prayer—leaving the retinue vulnerable during prayer windows. Accompanied by a five-person divine retinue, the player escorts the Covenant Ark across infected swamp ruins to reach the Pope’s holy sanctuary."
  },

  weapons: [
    {
      slot: 1,
      id: "m4a1",
      name: "M4A1 Assault Rifle",
      unlockCost: "Starter (Free)",
      costValue: 0,
      caliber: "5.56mm NATO",
      ammoPack: "+60 rounds / $75",
      reserveInfo: "Starts 60 / 300 Reserve",
      role: "Balanced full-auto all-rounder",
      description: "Standard-issue tactical carbine equipped from Day 1 Wave 1. Upgraded in v2.0.58 to 60/300 starting reserve ammo for reliable sustained fire across early waves.",
      image: "assets/wep_m4a1.png",
      combatShot: "assets/shot_combat_m4a1.png",
      badgeClass: "emerald"
    },
    {
      slot: 2,
      id: "pistol",
      name: "Tactical 9mm Pistol",
      unlockCost: "Starter (Free)",
      costValue: 0,
      caliber: "9mm Parabellum",
      ammoPack: "Unlimited Reserve",
      reserveInfo: "Infinite Emergency Backup",
      role: "Reliable last-defense sidearm",
      description: "High-reliability sidearm with unlimited reserve magazines. Ensures you never face the horde completely unarmed when saving cash during intermissions.",
      image: "assets/wep_pistol.png",
      combatShot: "assets/shot_campfire_clean.png",
      badgeClass: "emerald"
    },
    {
      slot: 3,
      id: "shotgun",
      name: "Auto Shotgun 12G",
      unlockCost: "$950",
      costValue: 950,
      caliber: "12G Buckshot",
      ammoPack: "+16 shells / $85",
      reserveInfo: "High Pellet Spread",
      role: "Close-range crowd breacher",
      description: "Semi-automatic 12-gauge combat shotgun built to stop Rabid Rushers and breach tightly packed infected swarms inside the 360° perimeter.",
      image: "assets/wep_shotgun.png",
      combatShot: "assets/shot_combat_shotgun.png",
      badgeClass: "brass"
    },
    {
      slot: 4,
      id: "minigun",
      name: "Vulcan Minigun",
      unlockCost: "$2,200",
      costValue: 2200,
      caliber: "7.62mm Belt",
      ammoPack: "+150 rounds / $140",
      reserveInfo: "Rotary Belt-Fed",
      role: "Sustained horde suppression",
      description: "Heavy rotary machine gun that shreds Day 3–5 Riot Cop Armored Specials and suppresses multi-directional 45m horde spawns.",
      image: "assets/wep_minigun.png",
      combatShot: "assets/shot_combat_minigun.png",
      badgeClass: "brass"
    },
    {
      slot: 5,
      id: "rpg",
      name: "Devastator RPG-7",
      unlockCost: "$2,600",
      costValue: 2600,
      caliber: "85mm Warhead",
      ammoPack: "+2 rockets / $160",
      reserveInfo: "High-Explosive Anti-Armor",
      role: "Boss & Goliath armor breaker",
      description: "Heavy explosive launcher engineered for the Day 6 Wave 4 Goliath Brute and Day 7 Wave 6 Dual-Boss climax encounters.",
      image: "assets/wep_rpg.png",
      combatShot: "assets/shot_combat_day7_rpg.png",
      badgeClass: "crimson"
    },
    {
      slot: 6,
      id: "chainsaw",
      name: "Apocalypse Chainsaw",
      unlockCost: "$1,400",
      costValue: 1400,
      caliber: "2-Stroke Edge",
      ammoPack: "Infinite Fuel",
      reserveInfo: "No Ammo Cost",
      role: "Overrun melee shredder",
      description: "Brutal motorized melee weapon requiring zero ammunition refills—ideal for conserving Salvage Cash when overwhelmed at close quarters.",
      image: "assets/wep_chainsaw.png",
      combatShot: "assets/shot_combat_chainsaw.png",
      badgeClass: "brass"
    }
  ],

  entities: [
    {
      name: "The Survivor (Player)",
      faction: "Retinue Escort",
      factionType: "ally",
      role: "Equipped with a tactical backpack rig, flashlight, and Salvage Armory link. Clears infected waves, guards the perimeter, and manages loadout upgrades."
    },
    {
      name: "The Archbishop",
      faction: "Divine Retinue",
      factionType: "ally",
      role: "Bears the Sacred Covenant Ark & Reliquary Container; anchors the sanctuary pilgrimage across the swamp ruins."
    },
    {
      name: "Two Priests & Two Nuns",
      faction: "Divine Retinue",
      factionType: "ally",
      role: "Perform liturgical prayers to sanctify ammunition and wards while relying on the player’s perimeter defense during vulnerable prayer intervals."
    },
    {
      name: "Civilian Infected & Rabid Rushers",
      faction: "Unholy Horde (Days 1–2)",
      factionType: "enemy",
      role: "Primary Day 1–2 swarm units; Rushers close distance rapidly along flanking vectors, testing player stamina and target priority."
    },
    {
      name: "Riot Cop Armored Special",
      faction: "Unholy Horde (Days 3–5)",
      factionType: "enemy",
      role: "Introduced from Day 3 onward; carries heavy durability and knockback resistance, rewarding upgraded weapon damage and high-caliber fire."
    },
    {
      name: "Goliath Brute & Day 6–7 Bosses",
      faction: "Boss Tier (Days 6–7)",
      factionType: "boss",
      role: "High-HP climax threats spawning on late waves (Day 6 Wave 4 and Day 7 Dual-Boss Wave 6), designed around Devastator RPG-7 bursts and full 500-pt armor rigs."
    }
  ],

  waveTiers: [
    {
      id: "days1-2",
      label: "Days 1–2 • Outbreak",
      badge: "Early Escalation • Standard Swarm",
      title: "Days 1–2: Civilian Infected & Rabid Rushers",
      description: "The outbreak begins around the Respite Sanctuary campfire. Fast, erratic Rabid Rushers and predictive flankers test your stamina and night-vision situational awareness while you bank early Salvage Cash ($).",
      spawns: "4 Cardinal Directions (45m Radius)",
      enemies: "Civilian Infected, Rabid Rushers",
      recommendedGear: "M4A1 (60/300), Tactical 9mm, Auto Shotgun ($950)",
      screenshot: "assets/shot_combat_m4a1.png"
    },
    {
      id: "days3-5",
      label: "Days 3–5 • Armored Horde",
      badge: "Mid-Campaign • Heavy Knockback Resistance",
      title: "Days 3–5: Riot Cop Armored Specials",
      description: "Heavily armored Riot Cop specials join the 4-quadrant assault as the Respite Sanctuary beacon relocates across the swamp boardwalks. Unupgraded starter firearms struggle to pierce their ballistic gear.",
      spawns: "Multi-Squad 45m Fan-Out + Flankers",
      enemies: "Riot Cop Armored Specials, Rushers, Swarmers",
      recommendedGear: "5-Tier Gunsmith Upgrades, Chainsaw ($1,400), Vulcan Minigun ($2,200)",
      screenshot: "assets/Special_Zombies.jpg"
    },
    {
      id: "days6-7",
      label: "Days 6–7 • Boss Climax",
      badge: "Endgame Reckoning • Boss Tier",
      title: "Days 6–7: Goliath Brute & Dual-Boss Finale",
      description: "Day 6 Wave 4 unleashes the towering Goliath Brute Boss, leading into the ultimate Day 7 Wave 6 Dual-Boss climax. Requires a full 500-point Ballistic Armor Rig, stacked Field Stims, and 85mm Devastator RPG-7 warheads.",
      spawns: "Maximum Horde Density + Boss Vector",
      enemies: "Goliath Brute Boss, Dual-Boss Climax + Full Horde",
      recommendedGear: "Devastator RPG-7 ($2,600), 500-Pt Armor Rig, 5x Field Stims",
      screenshot: "assets/Brute_Zombies.jpg"
    }
  ],

  screenshots: [
    {
      src: "assets/shot_campfire_clean.png",
      title: "Respite Sanctuary Perimeter",
      category: "environment",
      caption: "Swamp sanctuary perimeter and 360° restricted engagement holographic barrier at dusk."
    },
    {
      src: "assets/shot_combat_m4a1.png",
      title: "Day 1 Wave 1 M4A1 Combat HUD",
      category: "combat",
      caption: "Day 1 Wave 1 engagement featuring enlarged minimap, forward night-vision cone, and $1,800 Salvage Cash HUD."
    },
    {
      src: "assets/shot_armory.png",
      title: "Salvage Armory & 5-Tier Gunsmith UI",
      category: "ui",
      caption: "High-contrast Salvage Armory UI ([B]) highlighting affordable gun part upgrade cards in Pine-Emerald."
    },
    {
      src: "assets/shot_combat_shotgun.png",
      title: "Auto Shotgun 12G Point-Blank Breach",
      category: "combat",
      caption: "Close-quarters crowd control using the $950 Auto Shotgun 12G against flanking infected."
    },
    {
      src: "assets/shot_combat_chainsaw.png",
      title: "Apocalypse Chainsaw Melee Defense",
      category: "combat",
      caption: "Zero-ammo infinite-fuel overrun defense with the $1,400 Apocalypse Chainsaw."
    },
    {
      src: "assets/shot_combat_minigun.png",
      title: "Vulcan Minigun Horde Suppression",
      category: "combat",
      caption: "Sustained 7.62mm rotary suppression fire clearing mid-to-late wave infected squads."
    },
    {
      src: "assets/shot_combat_day7_rpg.png",
      title: "Day 7 Devastator RPG-7 Heavy Wave",
      category: "combat",
      caption: "Late-wave 85mm heavy ordnance engagement with boundary alert and horde radar active."
    }
  ],

  systemRequirements: {
    note: "Hardware specifications below include editable placeholder estimates for standalone Windows PC (x86_64) deployment alongside canon Unity 2022.3.62f3 URP runtime targets.",
    minimum: {
      os: "Windows 10 (64-bit) [x86_64]",
      cpu: "Intel Core i3-6100 / AMD Ryzen 3 1200 [PLACEHOLDER]",
      ram: "8 GB System RAM",
      gpu: "NVIDIA GeForce GTX 1050 / AMD Radeon RX 560 (DX11)",
      directX: "Version 11 (URP 14.0.12 Shader Model 4.5)",
      storage: "4 GB available space [PLACEHOLDER]"
    },
    recommended: {
      os: "Windows 10 / Windows 11 (64-bit) [x86_64]",
      cpu: "Intel Core i5-10400 / AMD Ryzen 5 3600 [PLACEHOLDER]",
      ram: "16 GB Dual-Channel RAM",
      gpu: "NVIDIA GeForce GTX 1660 Super / RTX 2060 (60+ FPS @ 1080p)",
      directX: "Version 12",
      storage: "4 GB SSD space [PLACEHOLDER]"
    }
  },

  controls: [
    { platform: "Windows PC", binding: "W A S D Move · Shift Sprint · Space Jump / Roll", status: "Supported", badge: "emerald" },
    { platform: "Windows PC", binding: "Mouse Aim & Look · LMB Fire / Melee · RMB Aim Down Sights", status: "Supported", badge: "emerald" },
    { platform: "Windows PC", binding: "1 – 6 or Scroll Wheel Switch Weapon · R Reload", status: "Supported", badge: "emerald" },
    { platform: "Windows PC", binding: "B Open/Close Salvage Armory · F Refill All · G Buy Active Ammo (+60)", status: "Supported", badge: "emerald" },
    { platform: "Windows PC (QA)", binding: "F9 Unlock All Guns · F10 God Mode · F11 Wave QA Menu · F7 Skip Timer", status: "Dev / QA", badge: "brass" },
    { platform: "Gamepad / Controller", binding: "Basic locomotion & camera via Invector defaults; Shop UI requires mouse cursor", status: "Partial", badge: "brass" },
    { platform: "macOS / Linux / Mobile", binding: "No standalone build preset or touch HUD implemented", status: "Not Supported", badge: "crimson" }
  ],

  team: [
    {
      initials: "KB",
      name: "Kent Basalan",
      badge: "Lead Dev",
      badgeColor: "brass",
      role: "Game Developer & Narrative Designer",
      bio: "Core C# gameplay architecture, 7-day horde progression, Salvage Armory economy, HUD systems, and Holy vs. Devil narrative worldbuilding."
    },
    {
      initials: "LP",
      name: "Luis Pingul",
      badge: "Web",
      badgeColor: "emerald",
      role: "Official Website & Documentation Engineer",
      bio: "Official game website & documentation portal engineering, GitHub Pages architecture, interactive UI systems, trailer integration, and responsive wasteland-tactical layout."
    },
    {
      initials: "XP",
      name: "Xienna Pugoy",
      badge: "Docs",
      badgeColor: "blue",
      role: "Game Design Documentation & Mechanics Spec",
      bio: "Game Design Document compilation, core survival mechanics & economy specification, and structured technical reference authoring."
    },
    {
      initials: "JS",
      name: "Jushua Sanchez",
      badge: "Docs & QA",
      badgeColor: "blue",
      role: "Asset Auditing & Playtest Record Curation",
      bio: "Third-party Unity Asset Store package & license auditing, playtest issue tracking, and verification changelog curation."
    }
  ]
};
