"""
Tests for users app
"""
import pytest
from django.contrib.auth.models import User, Group
from rest_framework import status
from rest_framework.test import APIClient
from users.models import UserProfile
from users.permission_models import FeaturePermission


@pytest.mark.django_db
class TestUserRegistration:
    """Test user registration endpoint"""
    
    def test_register_user_success(self, api_client):
        """Test successful user registration"""
        data = {
            'username': 'newuser',
            'email': 'newuser@test.com',
            'password': 'testpass123',
            'first_name': 'New',
            'last_name': 'User'
        }
        response = api_client.post('/api/register/', data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(username='newuser').exists()
        assert UserProfile.objects.filter(user__username='newuser').exists()
    
    def test_register_user_duplicate_username(self, api_client, regular_user):
        """Test registration with duplicate username"""
        data = {
            'username': 'testuser',
            'email': 'different@test.com',
            'password': 'testpass123',
            'first_name': 'Test',
            'last_name': 'User'
        }
        response = api_client.post('/api/register/', data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'already exists' in response.json()['error'].lower()
    
    def test_register_user_missing_fields(self, api_client):
        """Test registration with missing required fields"""
        data = {
            'username': 'newuser',
            'email': 'newuser@test.com',
            # Missing password, first_name, last_name
        }
        response = api_client.post('/api/register/', data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestUserInfo:
    """Test user info endpoint"""
    
    def test_user_info_authenticated(self, authenticated_client, regular_user):
        """Test getting user info when authenticated"""
        response = authenticated_client.get('/api/user-info/')
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data['username'] == 'testuser'
        assert data['email'] == 'test@test.com'
        assert data['role'] == 'viewer'
    
    def test_user_info_unauthenticated(self, api_client):
        """Test getting user info when not authenticated"""
        response = api_client.get('/api/user-info/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestJWTToken:
    """Test JWT token endpoints"""
    
    def test_token_obtain_success(self, api_client, regular_user):
        """Test successful token obtain"""
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = api_client.post('/api/token/', data, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.json()
        assert 'refresh' in response.json()
    
    def test_token_obtain_invalid_credentials(self, api_client):
        """Test token obtain with invalid credentials"""
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        response = api_client.post('/api/token/', data, format='json')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_token_refresh(self, api_client, regular_user):
        """Test token refresh"""
        # First get tokens
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = api_client.post('/api/token/', data, format='json')
        refresh_token = response.json()['refresh']
        
        # Now refresh
        refresh_data = {'refresh': refresh_token}
        response = api_client.post('/api/token/refresh/', refresh_data, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.json()


@pytest.mark.django_db
class TestUserManagement:
    """Test user management endpoints (admin only)"""
    
    def test_list_users_admin(self, admin_client):
        """Test listing users as admin"""
        response = admin_client.get('/api/users/')
        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.json(), list)
    
    def test_list_users_non_admin(self, authenticated_client):
        """Test listing users as non-admin (should fail)"""
        response = authenticated_client.get('/api/users/')
        assert response.status_code == status.HTTP_403_FORBIDDEN
    
    def test_create_user_admin(self, admin_client):
        """Test creating user as admin"""
        data = {
            'username': 'newuser',
            'email': 'newuser@test.com',
            'password': 'testpass123',
            'first_name': 'New',
            'last_name': 'User',
            'role': 'viewer',
            'is_active': True
        }
        response = admin_client.post('/api/users/create/', data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(username='newuser').exists()
    
    def test_get_user_admin(self, admin_client, regular_user):
        """Test getting user details as admin"""
        response = admin_client.get(f'/api/users/{regular_user.id}/')
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data['username'] == 'testuser'


@pytest.mark.django_db
class TestMonitoredSites:
    """Test monitored sites endpoints"""
    
    def test_list_monitored_sites_authenticated(self, authenticated_client, regular_user):
        """Test listing monitored sites when authenticated"""
        response = authenticated_client.get('/api/monitor/sites/')
        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.json(), list)
    
    def test_create_monitored_site(self, authenticated_client, regular_user):
        """Test creating a monitored site"""
        data = {
            'url': 'https://example.com',
            'name': 'Example Site'
        }
        response = authenticated_client.post('/api/monitor/sites/', data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data['url'] == 'https://example.com'
        assert data['name'] == 'Example Site'
        assert data['user'] == regular_user.id


# Fixtures for tests that use them (if not provided by conftest)
@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def regular_user(db):
    user = User.objects.create_user(
        username='testuser',
        email='test@test.com',
        password='testpass123',
        first_name='Test',
        last_name='User'
    )
    viewer = Group.objects.filter(name='Viewer').first()
    if viewer:
        user.groups.add(viewer)
    return user


@pytest.fixture
def authenticated_client(api_client, regular_user):
    api_client.force_authenticate(user=regular_user)
    return api_client


@pytest.fixture
def admin_user(db):
    user = User.objects.create_superuser(
        username='adminuser',
        email='admin@test.com',
        password='adminpass123'
    )
    return user


@pytest.fixture
def admin_client(api_client, admin_user):
    api_client.force_authenticate(user=admin_user)
    return api_client


@pytest.mark.django_db
class TestSidebarMatrixPersistence:
    """
    Test that sidebar matrix permission updates persist and do NOT strip non-sidebar permissions.
    Critical security fix: update must MERGE (preserve roles.edit, users.view, etc.) not REPLACE.
    """

    def test_update_preserves_non_sidebar_permissions(self, admin_client):
        """Updating sidebar matrix must preserve roles.edit, users.view etc."""
        # Run setup_permissions to ensure FeaturePermissions exist
        from django.core.management import call_command
        call_command('setup_permissions', verbosity=0)

        # Get Admin group and ensure it has roles.edit + users.view (non-sidebar)
        admin_group = Group.objects.filter(name='Admin').first()
        if not admin_group:
            admin_group = Group.objects.create(name='Admin')

        fp_roles_edit = FeaturePermission.objects.filter(code='roles.edit').first()
        fp_users_view = FeaturePermission.objects.filter(code='users.view').first()
        fp_discovery = FeaturePermission.objects.filter(code='discovery.overview.view').first()
        if not fp_roles_edit or not fp_users_view or not fp_discovery:
            pytest.skip('setup_permissions did not create required FeaturePermissions')

        # Give Admin: roles.edit, users.view, discovery.overview.view
        perms_to_add = []
        if fp_roles_edit.django_permission:
            perms_to_add.append(fp_roles_edit.django_permission)
        if fp_users_view.django_permission:
            perms_to_add.append(fp_users_view.django_permission)
        if fp_discovery.django_permission:
            perms_to_add.append(fp_discovery.django_permission)
        for p in perms_to_add:
            admin_group.permissions.add(p)

        # Simulate frontend: send ONLY sidebar permission (discovery.overview.view)
        response = admin_client.post(
            '/api/roles/sidebar-matrix/update/',
            {'role_id': admin_group.id, 'permission_codes': ['discovery.overview.view']},
            format='json'
        )
        assert response.status_code == status.HTTP_200_OK, response.json()

        # Reload and verify roles.edit and users.view are STILL there (merge preserved them)
        admin_group.refresh_from_db()
        perm_codes = set()
        for p in admin_group.permissions.all():
            try:
                fp = FeaturePermission.objects.get(django_permission=p)
                perm_codes.add(fp.code)
            except FeaturePermission.DoesNotExist:
                perm_codes.add(p.codename.replace('_', '.'))
        assert 'roles.edit' in perm_codes, f'roles.edit was stripped! Has: {perm_codes}'
        assert 'users.view' in perm_codes, f'users.view was stripped! Has: {perm_codes}'
        assert 'discovery.overview.view' in perm_codes, f'discovery.overview.view missing! Has: {perm_codes}'

    def test_sidebar_matrix_update_persists_after_save(self, admin_client):
        """
        Verify that permission changes via the update API persist to auth_group_permissions.
        GET matrix -> POST update -> GET matrix again -> changes must be visible.
        """
        from django.core.management import call_command
        call_command('setup_permissions', verbosity=0)

        # Get Viewer group (or first non-Admin group)
        viewer_group = Group.objects.filter(name='Viewer').first()
        if not viewer_group:
            viewer_group = Group.objects.filter(name='Analyst').first()
        if not viewer_group:
            pytest.skip('No Viewer or Analyst group found')

        # Get current permissions from GET
        get_resp = admin_client.get('/api/roles/sidebar-matrix/')
        assert get_resp.status_code == status.HTTP_200_OK
        data = get_resp.json()
        role_id_str = str(viewer_group.id)
        roles = {r['id']: r for r in data['roles']}
        assert viewer_group.id in roles, 'Viewer role should be in matrix'

        # Find one sidebar item and its permission code
        sidebar_items = data.get('sidebar_items', [])
        if not sidebar_items:
            pytest.skip('No sidebar items in matrix')
        item = sidebar_items[0]
        item_id = item['id']
        perm_code = item.get('required_permissions', {}).get('view')
        if not perm_code:
            pytest.skip(f'Item {item_id} has no view permission')

        access_before = item.get('role_access', {}).get(role_id_str, {})
        had_view_before = access_before.get('view', False)

        # Build new permission set: toggle the view for this item
        current_codes = []
        for si in sidebar_items:
            ra = si.get('role_access', {}).get(role_id_str, {})
            rp = si.get('required_permissions', {})
            if ra.get('view') and rp.get('view'):
                current_codes.append(rp['view'])
            if ra.get('create') and rp.get('create'):
                current_codes.append(rp['create'])
            if ra.get('edit') and rp.get('edit'):
                current_codes.append(rp['edit'])
            if ra.get('delete') and rp.get('delete'):
                current_codes.append(rp['delete'])

        if perm_code in current_codes:
            current_codes = [c for c in current_codes if c != perm_code]
        else:
            current_codes.append(perm_code)

        # POST update
        update_resp = admin_client.post(
            '/api/roles/sidebar-matrix/update/',
            {'role_id': viewer_group.id, 'permission_codes': current_codes},
            format='json'
        )
        assert update_resp.status_code == status.HTTP_200_OK, update_resp.json()

        # GET again and verify the change persisted
        get_resp2 = admin_client.get('/api/roles/sidebar-matrix/')
        assert get_resp2.status_code == status.HTTP_200_OK
        data2 = get_resp2.json()
        item2 = next((s for s in data2['sidebar_items'] if s['id'] == item_id), None)
        assert item2 is not None
        access_after = item2.get('role_access', {}).get(role_id_str, {})
        has_view_after = access_after.get('view', False)

        assert has_view_after != had_view_before, (
            f'Permission change did not persist. Before: view={had_view_before}, After: view={has_view_after}'
        )
