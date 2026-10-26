import { TeamMember, Department, TeamRole } from '../types';

export interface FilterCriteria {
  department?: Department | 'All';
  role?: TeamRole | 'All';
  practiceArea?: string | 'All';
  searchQuery?: string;
  onlyPublished?: boolean;
  onlyFeatured?: boolean;
}

/**
 * Filter team members based on department, role, practice area, and search query.
 */
export function filterTeamMembers(
  members: TeamMember[],
  criteria: FilterCriteria
): TeamMember[] {
  return members.filter((member) => {
    // Archived check
    if (member.isArchived) {
      return false;
    }

    // Published status check
    if (criteria.onlyPublished && !member.isPublished) {
      return false;
    }

    // Featured status check
    if (criteria.onlyFeatured && !member.isFeatured) {
      return false;
    }

    // Department filter
    if (criteria.department && criteria.department !== 'All') {
      if (member.department !== criteria.department) {
        return false;
      }
    }

    // Role filter
    if (criteria.role && criteria.role !== 'All') {
      if (member.role !== criteria.role) {
        return false;
      }
    }

    // Practice area filter
    if (criteria.practiceArea && criteria.practiceArea !== 'All') {
      const hasArea = member.practiceAreas.some(
        (area) => area.toLowerCase() === criteria.practiceArea?.toLowerCase()
      );
      if (!hasArea) {
        return false;
      }
    }

    // Search query matching name, designation, qualifications, or practice areas
    if (criteria.searchQuery && criteria.searchQuery.trim() !== '') {
      const q = criteria.searchQuery.toLowerCase().trim();
      const nameMatch = member.name.toLowerCase().includes(q);
      const designationMatch = member.designation.toLowerCase().includes(q);
      const qualMatch = member.qualifications.some((qual) =>
        qual.toLowerCase().includes(q)
      );
      const areaMatch = member.practiceAreas.some((area) =>
        area.toLowerCase().includes(q)
      );
      const barMatch = member.barEnrollment.toLowerCase().includes(q);

      if (!nameMatch && !designationMatch && !qualMatch && !areaMatch && !barMatch) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sorts team members: featured first, then by ascending order index, then by years of experience descending.
 */
export function sortTeamMembers(members: TeamMember[]): TeamMember[] {
  return [...members].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return b.yearsOfExperience - a.yearsOfExperience;
  });
}

/**
 * Validates a team member for publishing readiness.
 */
export function validateTeamMember(member: Partial<TeamMember>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!member.name || member.name.trim().length < 2) {
    errors.name = 'Full name is required and must have at least 2 characters.';
  }
  if (!member.designation || member.designation.trim().length === 0) {
    errors.designation = 'Official designation is required.';
  }
  if (!member.department) {
    errors.department = 'Department is required.';
  }
  if (!member.role) {
    errors.role = 'Role category is required.';
  }
  if (!member.barEnrollment || member.barEnrollment.trim().length === 0) {
    errors.barEnrollment = 'Bar enrollment / regulatory credentials are required.';
  }
  if (!member.qualifications || member.qualifications.length === 0) {
    errors.qualifications = 'At least one verified qualification is required.';
  }
  if (!member.practiceAreas || member.practiceAreas.length === 0) {
    errors.practiceAreas = 'At least one practice area must be assigned.';
  }
  if (!member.biography || member.biography.trim().length < 20) {
    errors.biography = 'Biography must be at least 20 characters.';
  }
  if (!member.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
    errors.email = 'Valid office email address is required.';
  }
  if (!member.altText || member.altText.trim().length === 0) {
    errors.altText = 'Accessible image description is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
