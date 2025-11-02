'use client';

import { useState } from 'react';

interface Step {
  id: number;
  title: string;
  content: string;
  code?: string;
  tips?: string[];
  warnings?: string[];
}

export default function Home() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleStepCheck = (stepId: number) => {
    const newChecked = new Set(checkedSteps);
    if (newChecked.has(stepId)) {
      newChecked.delete(stepId);
    } else {
      newChecked.add(stepId);
    }
    setCheckedSteps(newChecked);
  };

  const steps: Step[] = [
    {
      id: 1,
      title: "System Requirements Check",
      content: "Before starting, ensure your PC meets the minimum requirements for Unity game porting.",
      tips: [
        "RAM: Minimum 8GB, recommended 16GB+ (32GB for large games like Silksong)",
        "CPU: Multi-core processor (4+ cores recommended)",
        "Storage: SSD with at least 50GB free space",
        "OS: Windows 10/11, macOS, or Linux"
      ],
      warnings: [
        "2-core 6GB RAM systems may struggle with large games",
        "Ensure you have enough disk space for decompiled assets (games can expand 2-3x)"
      ]
    },
    {
      id: 2,
      title: "Knowledge Prerequisites",
      content: "While you can learn as you go, having these skills will significantly help the porting process.",
      tips: [
        "C# programming basics (variables, functions, classes)",
        "Unity API fundamentals (GameObject, Transform, MonoBehaviour)",
        "Basic understanding of Android development",
        "Familiarity with Unity Editor interface",
        "Git/version control (optional but recommended)"
      ],
      code: `// Example: Basic Unity C# knowledge you'll need
public class GameController : MonoBehaviour
{
    void Start() {
        // Initialization
    }

    void Update() {
        // Game loop
    }
}`
    },
    {
      id: 3,
      title: "Download AssetRipper",
      content: "AssetRipper is the primary tool for decompiling Unity games. It handles Mono assemblies, shaders, and resource unpacking.",
      tips: [
        "Download from: https://github.com/AssetRipper/AssetRipper",
        "Get the latest release for your OS",
        "Extract to an easily accessible location",
        "No installation required - it's portable"
      ],
      code: `# Download latest release (example)
# Windows: AssetRipper_win_x64.zip
# Linux: AssetRipper_linux_x64.zip
# macOS: AssetRipper_mac_x64.zip`,
      warnings: [
        "Ensure Windows Defender or antivirus doesn't block the tool",
        "Some games with heavy obfuscation may not decompile perfectly"
      ]
    },
    {
      id: 4,
      title: "Locate Game Data Folder",
      content: "Find the Unity game's data folder on your PC. This contains all game assets and code.",
      tips: [
        "Look for: GAMENAME_Data folder",
        "Common locations: C:\\Program Files\\Steam\\steamapps\\common\\GAMENAME",
        "The folder contains: Managed folder, Resources, level files, etc.",
        "Make a backup of the original game files!"
      ],
      code: `# Example game structure:
GAMENAME/
├── GAMENAME.exe
├── GAMENAME_Data/
│   ├── Managed/          # DLL files here
│   ├── Resources/        # Asset files
│   ├── StreamingAssets/
│   ├── level0
│   └── globalgamemanagers`,
      warnings: [
        "ALWAYS create a backup before modifying files",
        "Ensure you have legal rights to port the game"
      ]
    },
    {
      id: 5,
      title: "Run AssetRipper Decompilation",
      content: "Use AssetRipper to decompile the game and extract all assets and code.",
      tips: [
        "Launch AssetRipper executable",
        "Select 'File' > 'Open Folder'",
        "Navigate to GAMENAME_Data folder",
        "Click 'Export' > 'Export All Files'",
        "Choose output directory (needs lots of space)",
        "Wait for process to complete (can take 10min - 2hours)"
      ],
      code: `# AssetRipper will create structure like:
ExportedProject/
├── Assets/
│   ├── Scripts/          # Decompiled C# scripts
│   ├── Resources/
│   ├── Scenes/
│   └── Plugins/
└── ProjectSettings/`,
      warnings: [
        "This process is resource-intensive",
        "Don't interrupt the process",
        "Monitor disk space during export"
      ]
    },
    {
      id: 6,
      title: "Install Unity Editor",
      content: "Install the Unity version matching the original game (or close to it).",
      tips: [
        "Download Unity Hub: https://unity.com/download",
        "Check game's Unity version in globalgamemanagers file",
        "Install matching Unity version via Unity Hub",
        "Include Android Build Support module",
        "Include Android SDK & NDK Tools",
        "Include OpenJDK"
      ],
      code: `# Unity Hub Installation:
# 1. Open Unity Hub
# 2. Installs > Add
# 3. Select Unity version (e.g., 2021.3.15f1)
# 4. Check modules:
#    ☑ Android Build Support
#    ☑ Android SDK & NDK Tools
#    ☑ OpenJDK`,
      warnings: [
        "Version mismatch can cause compatibility issues",
        "Android Build Support is REQUIRED"
      ]
    },
    {
      id: 7,
      title: "Open Project in Unity",
      content: "Open the exported project in Unity Editor.",
      tips: [
        "Unity Hub > Projects > Add",
        "Select the ExportedProject folder",
        "Let Unity import all assets (this takes time)",
        "Errors are normal - you'll fix them later",
        "Check Console for critical errors"
      ],
      warnings: [
        "First import can take 30+ minutes",
        "Expect shader compilation errors",
        "Missing prefab warnings are common"
      ]
    },
    {
      id: 8,
      title: "Switch Platform to Android",
      content: "Change the build target from PC to Android.",
      tips: [
        "File > Build Settings",
        "Select 'Android' from platform list",
        "Click 'Switch Platform'",
        "Wait for Unity to re-import assets for Android",
        "This can take 10-30 minutes"
      ],
      code: `// Check platform in code:
#if UNITY_ANDROID
    // Android-specific code
#elif UNITY_STANDALONE
    // PC-specific code
#endif`
    },
    {
      id: 9,
      title: "Configure Android Settings",
      content: "Set up proper Android build settings and player configurations.",
      tips: [
        "Edit > Project Settings > Player",
        "Set Company Name and Product Name",
        "Set Package Name (com.company.gamename)",
        "Set Minimum API Level (23+ recommended)",
        "Configure Scripting Backend (IL2CPP or Mono)",
        "Set ARM64 architecture",
        "Configure input for touchscreen"
      ],
      code: `// Player Settings:
Package Name: com.yourcompany.gamename
Min API Level: Android 6.0 (API 23)
Target API Level: Android 13.0 (API 33)
Scripting Backend: IL2CPP
Architecture: ARM64`,
      warnings: [
        "IL2CPP is slower to build but more compatible",
        "ARM64 is required for Google Play Store",
        "Package name must be unique"
      ]
    },
    {
      id: 10,
      title: "Fix Compilation Errors",
      content: "Debug and resolve C# compilation errors in the Console.",
      tips: [
        "Open Console window (Window > General > Console)",
        "Address errors one by one",
        "Common issues: missing references, PC-only APIs",
        "Use #if UNITY_ANDROID directives",
        "Replace PC input with touch input",
        "Fix file path issues (Android has different paths)"
      ],
      code: `// Fix input for mobile:
// OLD (PC):
if (Input.GetKeyDown(KeyCode.Space)) { }

// NEW (Mobile-compatible):
if (Input.GetMouseButtonDown(0)) {
    // Touch or click
}

// Fix file paths:
// OLD:
string path = "C:\\\\Data\\\\file.txt";

// NEW:
string path = Path.Combine(
    Application.persistentDataPath,
    "file.txt"
);`,
      warnings: [
        "Some PC APIs don't work on Android",
        "Test input changes thoroughly"
      ]
    },
    {
      id: 11,
      title: "Optimize for Mobile Performance",
      content: "Adjust graphics, physics, and game settings for mobile devices.",
      tips: [
        "Reduce texture quality/resolution",
        "Simplify shaders (use mobile-friendly shaders)",
        "Lower polygon counts if needed",
        "Adjust physics timestep",
        "Reduce draw calls",
        "Enable GPU skinning",
        "Use LOD (Level of Detail) systems",
        "Profile with Unity Profiler"
      ],
      code: `// Quality Settings (Edit > Project Settings > Quality):
// Create Android quality preset:
- Texture Quality: Medium
- Shadow Resolution: Medium
- Shadow Distance: 50-75
- Anti-Aliasing: 2x or disabled
- VSync: Off
- Target Frame Rate: 60`,
      warnings: [
        "Test on actual device, not just editor",
        "Balance quality vs performance",
        "Monitor memory usage"
      ]
    },
    {
      id: 12,
      title: "Adapt UI for Touchscreen",
      content: "Modify UI and controls to work with touch input.",
      tips: [
        "Increase button sizes (min 44x44 pixels)",
        "Add virtual joysticks if needed",
        "Replace keyboard shortcuts with UI buttons",
        "Test different screen sizes/ratios",
        "Add touch gesture support",
        "Ensure UI scales properly",
        "Canvas Scaler: Scale with Screen Size",
        "Reference Resolution: 1920x1080",
        "Match: 0.5 (balance width/height)"
      ],
      code: `// Add virtual joystick:
// Use Unity's UI EventSystem
// Add Canvas with buttons for controls

// Touch detection:
if (Input.touchCount > 0) {
    Touch touch = Input.GetTouch(0);
    if (touch.phase == TouchPhase.Began) {
        // Handle touch
    }
}`
    },
    {
      id: 13,
      title: "Handle Android Permissions",
      content: "Configure required Android permissions in the manifest.",
      tips: [
        "Edit AndroidManifest.xml",
        "Add required permissions",
        "Request runtime permissions in code",
        "Common: Storage, Internet, Vibration"
      ],
      code: `<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.VIBRATE" />

// Request at runtime (Android 6.0+):
#if UNITY_ANDROID
if (!Permission.HasUserAuthorizedPermission(
    Permission.ExternalStorageWrite)) {
    Permission.RequestUserPermission(
        Permission.ExternalStorageWrite);
}
#endif`
    },
    {
      id: 14,
      title: "Build APK/AAB",
      content: "Create the Android application package.",
      tips: [
        "File > Build Settings > Build",
        "Choose APK (testing) or AAB (Google Play)",
        "Select output location",
        "Wait for build to complete",
        "AAB for Play Store, APK for testing",
        "First build takes longest"
      ],
      code: `// Build output:
GAMENAME.apk  (100-500MB typical)
or
GAMENAME.aab  (for Google Play)`,
      warnings: [
        "IL2CPP builds take 10-30+ minutes",
        "Ensure enough disk space (5GB+)",
        "Don't interrupt the build process"
      ]
    },
    {
      id: 15,
      title: "Test on Android Device",
      content: "Deploy and test the game on actual Android hardware.",
      tips: [
        "Enable Developer Options on Android",
        "Enable USB Debugging",
        "Connect device via USB",
        "Install APK: adb install GAMENAME.apk",
        "Check logcat for errors: adb logcat",
        "Test all game features",
        "Monitor performance and crashes"
      ],
      code: `# ADB Commands:
# Install APK
adb install -r GAMENAME.apk

# View logs
adb logcat -s Unity

# Clear logs
adb logcat -c

# Uninstall
adb uninstall com.company.gamename`,
      warnings: [
        "Test on multiple devices/Android versions",
        "Check memory usage",
        "Monitor battery drain"
      ]
    },
    {
      id: 16,
      title: "Debug Common Issues",
      content: "Troubleshoot and fix issues discovered during testing.",
      tips: [
        "Crashes: Check logcat output",
        "Performance: Use Unity Profiler",
        "Graphics glitches: Check shader compatibility",
        "Input issues: Verify touch handling",
        "Loading problems: Check file paths",
        "Audio problems: Check format support"
      ],
      code: `// Common fixes:

// 1. Null Reference Exception
if (myObject != null) {
    myObject.DoSomething();
}

// 2. Performance issues
void Update() {
    // Move to FixedUpdate or reduce frequency
}

// 3. Shader issues
// Replace with Mobile-compatible shaders:
// Standard -> Mobile/Diffuse
// Particles -> Mobile/Particles/Alpha Blended`,
      warnings: [
        "Profile before optimizing",
        "Fix crashes before performance",
        "Keep backups of working versions"
      ]
    },
    {
      id: 17,
      title: "Optimize Build Size",
      content: "Reduce APK/AAB size for distribution.",
      tips: [
        "Enable ProGuard/R8 (code shrinking)",
        "Compress textures (ETC2, ASTC)",
        "Remove unused assets",
        "Split APKs by architecture",
        "Use Asset Bundles for large content",
        "Enable 'Strip Engine Code'",
        "Set Compression Method to LZ4"
      ],
      code: `// Build Settings Optimization:
Player Settings > Publishing:
☑ Split APKs by target architecture
☑ ProGuard (for AAB)

Player Settings > Other:
☑ Strip Engine Code
Stripping Level: High
Managed Stripping Level: High`,
      warnings: [
        "Test after stripping - may break some features",
        "Keep unstripped version for debugging"
      ]
    },
    {
      id: 18,
      title: "Prepare for Distribution",
      content: "Final steps before releasing to users or stores.",
      tips: [
        "Create keystore for signing (KEEP IT SAFE!)",
        "Sign your APK/AAB",
        "Create app icon (multiple sizes)",
        "Write app description",
        "Take screenshots",
        "Create privacy policy",
        "Test on various devices",
        "Set up crash reporting (e.g., Crashlytics)"
      ],
      code: `# Create keystore:
keytool -genkey -v -keystore my-release-key.keystore \\
  -alias myalias -keyalg RSA -keysize 2048 \\
  -validity 10000

# Sign APK (Unity does this automatically):
# Build Settings > Player Settings > Publishing
Keystore: my-release-key.keystore
Alias: myalias
Password: ********`,
      warnings: [
        "NEVER LOSE YOUR KEYSTORE - backup multiple locations",
        "Can't update app without original keystore",
        "Keep passwords in secure password manager"
      ]
    }
  ];

  const resources = [
    {
      title: "AssetRipper",
      url: "https://github.com/AssetRipper/AssetRipper",
      description: "Main decompilation tool"
    },
    {
      title: "Unity Download",
      url: "https://unity.com/download",
      description: "Unity Hub and Editor"
    },
    {
      title: "Unity Android Documentation",
      url: "https://docs.unity3d.com/Manual/android.html",
      description: "Official Unity Android guide"
    },
    {
      title: "dnSpy",
      url: "https://github.com/dnSpy/dnSpy",
      description: "Advanced .NET debugger and assembly editor"
    },
    {
      title: "Android SDK Platform Tools",
      url: "https://developer.android.com/studio/releases/platform-tools",
      description: "ADB and other Android tools"
    }
  ];

  const currentStep = steps.find(s => s.id === activeStep);
  const progress = (checkedSteps.size / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Unity to Android Porter
          </h1>
          <p className="text-gray-300 mt-2">Complete guide for porting Unity games from PC to Android</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 mb-8 border border-purple-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 font-semibold">Overall Progress</span>
            <span className="text-purple-400 font-bold">{checkedSteps.size}/{steps.length} Steps</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Step Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 sticky top-4">
              <h2 className="text-xl font-bold text-purple-400 mb-4">Steps</h2>
              <div className="space-y-2">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={checkedSteps.has(step.id)}
                      onChange={() => toggleStepCheck(step.id)}
                      className="mt-1 w-4 h-4 rounded accent-purple-500"
                    />
                    <button
                      onClick={() => setActiveStep(step.id)}
                      className={`text-left text-sm transition-colors flex-1 ${
                        activeStep === step.id
                          ? 'text-purple-400 font-semibold'
                          : checkedSteps.has(step.id)
                          ? 'text-green-400'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {step.id}. {step.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentStep && (
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-purple-400">
                    Step {currentStep.id}: {currentStep.title}
                  </h2>
                  <button
                    onClick={() => toggleStepCheck(currentStep.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      checkedSteps.has(currentStep.id)
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {checkedSteps.has(currentStep.id) ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>

                <p className="text-gray-300 text-lg mb-6">{currentStep.content}</p>

                {/* Tips */}
                {currentStep.tips && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">💡 Tips</h3>
                    <ul className="space-y-2">
                      {currentStep.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-300">
                          <span className="text-blue-400">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Code */}
                {currentStep.code && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-green-400 mb-3">💻 Code/Commands</h3>
                    <pre className="bg-black/60 border border-green-500/30 rounded-lg p-4 overflow-x-auto">
                      <code className="text-green-300 text-sm">{currentStep.code}</code>
                    </pre>
                  </div>
                )}

                {/* Warnings */}
                {currentStep.warnings && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">⚠️ Warnings</h3>
                    <ul className="space-y-2">
                      {currentStep.warnings.map((warning, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-300 bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                          <span className="text-yellow-400">!</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-purple-500/30">
                  <button
                    onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                    disabled={activeStep === 1}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                    disabled={activeStep === steps.length}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Resources */}
            <div className="mt-8 bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">📚 Essential Resources</h2>
              <div className="space-y-3">
                {resources.map((resource, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-black/40 rounded-lg p-4 border border-purple-500/20">
                    <div>
                      <h3 className="font-semibold text-gray-200">{resource.title}</h3>
                      <p className="text-sm text-gray-400">{resource.description}</p>
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Visit →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-8 bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">❓ Common Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-200 mb-2">Q: Is this legal?</h3>
                  <p className="text-gray-400">A: Only port games you own or have permission to modify. Respect copyright laws and game licenses.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200 mb-2">Q: How long does porting take?</h3>
                  <p className="text-gray-400">A: 1-4 weeks for simple games, 1-6 months for complex games, depending on size and issues encountered.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200 mb-2">Q: Can I distribute my port?</h3>
                  <p className="text-gray-400">A: Only if you have legal rights. Fan ports typically cannot be distributed without permission from the original developers.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200 mb-2">Q: What if AssetRipper fails?</h3>
                  <p className="text-gray-400">A: Try dnSpy for code analysis. Some games use obfuscation that requires manual decompilation and reconstruction.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200 mb-2">Q: Which Unity version should I use?</h3>
                  <p className="text-gray-400">A: Match the game's original Unity version as closely as possible. Check the globalgamemanagers file or use AssetRipper to detect it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-purple-500/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400">
          <p>Unity to Android Porter Guide • Built for game developers and porters</p>
          <p className="text-sm mt-2">Remember: Always respect intellectual property rights and obtain proper permissions</p>
        </div>
      </footer>
    </div>
  );
}
