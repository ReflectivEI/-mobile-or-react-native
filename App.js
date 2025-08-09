import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';

/*
 * ReflectiveEI Mobile App
 *
 * This simple React Native application demonstrates the core screens for
 * ReflectiveEI: a home screen, EI assessment, mood tracking, journaling,
 * and a dashboard. Each screen contains placeholder content and basic
 * interactions that you can extend into a full product. Navigation
 * between screens is handled via a simple state variable rather than
 * an external navigation library to keep dependencies minimal.
 */

// Import local assets
const heroImg = require('./assets/hero.png');
const moodImg = require('./assets/mood.png');
const journalImg = require('./assets/journal.png');

// Define the different screen identifiers
const SCREENS = {
  home: 'home',
  assess: 'assess',
  mood: 'mood',
  journal: 'journal',
  dashboard: 'dashboard'
};

export default function App() {
  const [current, setCurrent] = useState(SCREENS.home);
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalText, setJournalText] = useState('');

  // Navigation helper
  const navigate = (screen) => () => setCurrent(screen);

  // Render based on current screen
  const renderScreen = () => {
    switch (current) {
      case SCREENS.assess:
        return <AssessmentScreen onBack={navigate(SCREENS.home)} />;
      case SCREENS.mood:
        return (
          <MoodScreen
            selectedMood={selectedMood}
            onSelectMood={(m) => setSelectedMood(m)}
            onSave={() => {
              Alert.alert('Mood Saved', `You selected ${selectedMood || 'no mood'} today.`);
            }}
            onBack={navigate(SCREENS.home)}
          />
        );
      case SCREENS.journal:
        return (
          <JournalScreen
            text={journalText}
            onChangeText={(t) => setJournalText(t)}
            onSave={() => {
              Alert.alert('Journal Entry Saved', 'Your reflection has been recorded.');
              setJournalText('');
            }}
            onBack={navigate(SCREENS.home)}
          />
        );
      case SCREENS.dashboard:
        return <DashboardScreen onBack={navigate(SCREENS.home)} />;
      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {renderScreen()}
      </ScrollView>
      <BottomNav current={current} navigate={navigate} />
    </SafeAreaView>
  );
}

// Home screen component
function HomeScreen({ onNavigate }) {
  return (
    <View style={styles.screen}>
      <Image source={heroImg} style={styles.heroImage} />
      <Text style={styles.heading}>Welcome to ReflectivEI</Text>
      <Text style={styles.subheading}>
        Build emotional intelligence through self-reflection, mood tracking and journaling.
      </Text>
      <View style={styles.cardContainer}>
        <NavCard title="EI Assessment" onPress={onNavigate(SCREENS.assess)} />
        <NavCard title="Mood Tracker" onPress={onNavigate(SCREENS.mood)} />
        <NavCard title="Journal" onPress={onNavigate(SCREENS.journal)} />
        <NavCard title="Dashboard" onPress={onNavigate(SCREENS.dashboard)} />
      </View>
    </View>
  );
}

// EI Assessment screen
function AssessmentScreen({ onBack }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>EI Assessment</Text>
      <Text style={styles.paragraph}>
        Begin your journey by taking a validated Emotional Intelligence assessment. This short
        questionnaire provides a baseline of your self-awareness, empathy and regulation skills.
      </Text>
      <Text style={styles.paragraph}>
        ReflectivEI uses science-backed frameworks such as Six Seconds’ SEI and MSCEIT to ensure
        credible results. Your data stays private and secure.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Coming Soon', 'Assessment functionality coming soon!')}>
        <Text style={styles.buttonText}>Start Assessment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// Mood screen
function MoodScreen({ selectedMood, onSelectMood, onSave, onBack }) {
  const moods = ['😀','🙂','😐','😢','😠'];
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Mood Tracker</Text>
      <View style={styles.moodRow}>
        {moods.map((m) => (
          <TouchableOpacity key={m} onPress={() => onSelectMood(m)} style={[styles.moodButton, selectedMood === m && styles.moodButtonSelected]}>
            <Text style={styles.moodEmoji}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.paragraph}>
        {selectedMood ? `You selected: ${selectedMood}` : 'Select your mood for today.'}
      </Text>
      <Image source={moodImg} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>Save Mood</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// Journal screen
function JournalScreen({ text, onChangeText, onSave, onBack }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Journal</Text>
      <Text style={styles.paragraph}>
        Prompt: Think about a moment today when you felt a strong emotion. What triggered it and
        how did you respond? How would you like to respond differently next time?
      </Text>
      <TextInput
        style={styles.textArea}
        multiline
        value={text}
        onChangeText={onChangeText}
        placeholder="Write your thoughts here..."
      />
      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>Save Entry</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// Dashboard screen
function DashboardScreen({ onBack }) {
  // Sample data; in a real app these values come from state or a server
  const stats = [
    { label: 'EI Score', value: 82 },
    { label: 'Journals', value: 14 },
    { label: 'Day Streak', value: 7 },
    { label: 'Avg Mood', value: 4.5 },
  ];
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.statGrid}>
        {stats.map((item) => (
          <View key={item.label} style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// Card component used on home screen
function NavCard({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{title}</Text>
      <Text style={styles.cardArrow}>→</Text>
    </TouchableOpacity>
  );
}

// Bottom navigation bar
function BottomNav({ current, navigate }) {
  return (
    <View style={styles.bottomNav}>
      {[
        { id: SCREENS.home, label: 'Home', icon: '🏠' },
        { id: SCREENS.assess, label: 'Assess', icon: '📊' },
        { id: SCREENS.mood, label: 'Mood', icon: '😊' },
        { id: SCREENS.journal, label: 'Journal', icon: '📝' },
        { id: SCREENS.dashboard, label: 'Stats', icon: '📈' },
      ].map((item) => (
        <TouchableOpacity key={item.id} style={styles.navItem} onPress={navigate(item.id)}>
          <Text style={[styles.navIcon, current === item.id && styles.navIconActive]}>{item.icon}</Text>
          <Text style={[styles.navLabel, current === item.id && styles.navLabelActive]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fc',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 80, // space for nav bar
  },
  screen: {
    flex: 1,
    padding: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1c1c1e',
  },
  subheading: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  cardContainer: {
    display: 'flex',
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  cardArrow: {
    fontSize: 18,
    color: '#0070f3',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1c1c1e',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#0070f3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    marginTop: 10,
  },
  backText: {
    color: '#0070f3',
    fontSize: 16,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  moodButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    backgroundColor: '#e8effe',
    borderRadius: 8,
    alignItems: 'center',
  },
  moodButtonSelected: {
    backgroundColor: '#d2e0fd',
  },
  moodEmoji: {
    fontSize: 24,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  textArea: {
    height: 160,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#e8effe',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#005dd1',
  },
  statLabel: {
    fontSize: 14,
    color: '#1c1c1e',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    color: '#888',
  },
  navIconActive: {
    color: '#0070f3',
  },
  navLabel: {
    fontSize: 12,
    color: '#888',
  },
  navLabelActive: {
    color: '#0070f3',
  },
});