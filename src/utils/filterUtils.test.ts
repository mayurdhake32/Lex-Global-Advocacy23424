import test from 'node:test';
import assert from 'node:assert/strict';
import { filterTeamMembers, sortTeamMembers, validateTeamMember } from './filterUtils';
import { TeamMember } from '../types';

const mockMembers: TeamMember[] = [
  {
    id: '1',
    slug: 'elena-vance',
    name: 'Dame Elena Vance KC',
    designation: 'Managing Partner & Principal Advocate',
    department: 'Dispute Resolution & Arbitration',
    role: 'Managing Partner',
    qualifications: ['LL.M. (Cantab)', 'B.C.L. (Oxon)'],
    barEnrollment: 'Bar of England & Wales (Middle Temple, 1998)',
    practiceAreas: ['International Arbitration & Dispute Resolution', 'Cross-Border M&A'],
    languages: ['English', 'French'],
    biography: 'Leading advocate with three decades of trial and international arbitration practice.',
    yearsOfExperience: 28,
    milestones: ['Appointed King’s Counsel 2012'],
    publications: ['Cross-Border Injunctions (Oxford Press)'],
    email: 'e.vance@lexglobaladvocacy.com',
    officeLocation: 'London & Geneva',
    imageUrl: '/src/assets/images/portrait_elena_vance_1793026040571.jpg',
    altText: 'Portrait of Dame Elena Vance KC',
    order: 1,
    isFeatured: true,
    isPublished: true,
    isArchived: false,
    updatedAt: '2026-10-26T00:00:00Z',
  },
  {
    id: '2',
    slug: 'tariq-almansoor',
    name: 'Tariq Al-Mansoor',
    designation: 'Senior Advocate, Arbitration Counsel',
    department: 'Dispute Resolution & Arbitration',
    role: 'Senior Advocate',
    qualifications: ['LL.M. (Harvard)', 'LL.B. (London)'],
    barEnrollment: 'DIFC Courts / Bar of England & Wales',
    practiceAreas: ['International Arbitration & Dispute Resolution', 'Maritime & Admiralty Law'],
    languages: ['Arabic', 'English'],
    biography: 'Specialist in commercial maritime and bilateral investment treaty arbitrations.',
    yearsOfExperience: 18,
    milestones: ['Fellow of Chartered Institute of Arbitrators'],
    publications: ['Enforcement under New York Convention'],
    email: 't.almansoor@lexglobaladvocacy.com',
    officeLocation: 'Dubai & London',
    imageUrl: '/src/assets/images/portrait_tariq_almansoor_1793026078955.jpg',
    altText: 'Portrait of Tariq Al-Mansoor',
    order: 2,
    isFeatured: true,
    isPublished: true,
    isArchived: false,
    updatedAt: '2026-10-26T00:00:00Z',
  },
  {
    id: '3',
    slug: 'draft-member',
    name: 'Draft Researcher',
    designation: 'Legal Researcher',
    department: 'Legal Research & Academics',
    role: 'Legal Researcher',
    qualifications: ['LL.B. (Hons)'],
    barEnrollment: 'Pending Enrollment',
    practiceAreas: ['Corporate & Cross-Border M&A'],
    languages: ['English'],
    biography: 'Conducting foundational comparative jurisprudence studies.',
    yearsOfExperience: 3,
    milestones: [],
    publications: [],
    email: 'research@lexglobaladvocacy.com',
    officeLocation: 'London',
    imageUrl: '',
    altText: 'Draft member',
    order: 5,
    isFeatured: false,
    isPublished: false,
    isArchived: false,
    updatedAt: '2026-10-26T00:00:00Z',
  },
];

test('filterTeamMembers filters by department correctly', () => {
  const result = filterTeamMembers(mockMembers, {
    department: 'Dispute Resolution & Arbitration',
  });
  assert.equal(result.length, 2);
  assert.equal(result[0].name, 'Dame Elena Vance KC');
});

test('filterTeamMembers filters by role correctly', () => {
  const result = filterTeamMembers(mockMembers, {
    role: 'Senior Advocate',
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].slug, 'tariq-almansoor');
});

test('filterTeamMembers searches by qualification or practice area', () => {
  const byHarvard = filterTeamMembers(mockMembers, {
    searchQuery: 'Harvard',
  });
  assert.equal(byHarvard.length, 1);
  assert.equal(byHarvard[0].slug, 'tariq-almansoor');

  const byMaritime = filterTeamMembers(mockMembers, {
    searchQuery: 'Maritime',
  });
  assert.equal(byMaritime.length, 1);
  assert.equal(byMaritime[0].slug, 'tariq-almansoor');
});

test('filterTeamMembers handles onlyPublished flag', () => {
  const publishedOnly = filterTeamMembers(mockMembers, {
    onlyPublished: true,
  });
  assert.equal(publishedOnly.length, 2);
});

test('sortTeamMembers sorts by order index ascending', () => {
  const sorted = sortTeamMembers(mockMembers);
  assert.equal(sorted[0].id, '1');
  assert.equal(sorted[1].id, '2');
  assert.equal(sorted[2].id, '3');
});

test('validateTeamMember detects missing mandatory fields', () => {
  const invalidResult = validateTeamMember({
    name: 'A',
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.designation);
  assert.ok(invalidResult.errors.department);
});

test('validateTeamMember passes for complete member', () => {
  const validResult = validateTeamMember(mockMembers[0]);
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});
